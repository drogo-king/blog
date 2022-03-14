<script>
    import { onMount } from "svelte";
    import flexsearch from "flexsearch/src/index";

    let hidden = true;
    let index;
    let results = [];
    let data;
   
    const toggleSearch = () => {
        hidden = !hidden
    };

    onMount( async () => {
        index = new flexsearch({ tokenize: "forward" });
        data = await (await fetch("/data.json")).json();
        data.forEach(({ title, plaintext }, i) => {
 		    index.add(i, title + " " + plaintext);
 	    });
    })

    const match = (e) => {
        results = index.search(e.target.value)
    }
    
</script>

<button on:click={toggleSearch} aria-label="search" class="search">
    <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z"/></svg>
</button>

<div class:hidden>
    <input placeholder="Search" on:input={match}/>
    <button on:click={toggleSearch}>
      <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"/></svg>
    </button>
    <ol>
        {#each results as result}
            <li>
                <a href="https://alfheimr.xyz/{data[result].slug}">
                    <h2>{data[result].title}</h2>
                    <p>{data[result].plaintext.slice(0, 200) + "…"}</p>
                </a>
            </li>
        {/each}
    </ol>
</div>

<style>
    button {
        color: var(--color-secondary);
        transition: var(--icon-hover);
        border: none;
        background-color: transparent;
        cursor: pointer;
    }
    button:hover {
        color: var(--color-accent);
    }
    .search, svg {
        height: 1.7rem;
        width: 1.7rem;
    }
    .search {
        position: absolute;
        top: 1.65rem;
        right: 2.2rem;
    }
    div {
        position: fixed;
        top: 50%;
        left: 50%;
        height: 30rem;
        width: 50rem;
        background-color: white;
        box-shadow: 0 3.8px 2.2px rgb(0 0 0 / 3%), 0 9.2px 5.3px rgb(0 0 0 / 4%), 0 17.3px 10px rgb(0 0 0 / 5%), 0 30.8px 17.9px rgb(0 0 0 / 6%), 0 57.7px 33.4px rgb(0 0 0 / 7%), 0 138px 80px rgb(0 0 0 / 10%);
        transform: translate(-50%, -50%);
        display: grid;
        grid-template:
            "bar close" 2.5rem
            "result result" 1fr
            /1fr 2.5rem;
        padding: var(--spacing-half);
    }
    input {
        grid-area: bar;
        background-color: white;
        border: none;
        border-bottom: 2px solid var(--color-secondary);
        margin-right: 10px;
        margin-left: var(--spacing-half);
    }
    input:focus {
        outline: none;
        border-bottom-color: var(--color-accent);
    }
    div button {
        grid-area: close;
    }
    div button:active {
        color: var(--color-primary);
    }
    ol {
        grid-area: result;
        margin-top: var(--spacing-half);
        padding: 0;
        max-height: calc(27.5rem - var(--spacing-half));
        overflow: scroll;
    }
    li {
        margin-top: 4px;
        padding-top: var(--spacing-half);
        padding-bottom: var(--spacing-half);
        list-style-type: none;
        margin-left: var(--spacing-half);
        padding-left: var(--spacing-half);
        margin-right: var(--spacing);
        border-bottom: dotted 1px var(--color-secondary);
        transition: background-color 0.3s ease-out;
    }
    li:hover {
        background-color: var(--color-divider);
    }
    li h2 {
        font-size: 1em;
        margin: 0;
    }
    li p {
        margin-top: var(--spacing-half);
        font-style: italic;
    }
    .hidden {
        display: none !important;
    }
    @media (prefers-color-scheme: dark) {
        div {
		    background-color: var(--color-bg-secondary);
	    }
        div input {
            background-color: var(--color-bg-secondary);
        } 
    }
    @media (max-width: 680px) {
        .search {
            display: none;
        }
    }
</style>