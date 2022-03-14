<script>
    let hidden = true;
    let name;
    let email;

    const submit = () => {
        fetch("https://ghost.alfheimr.xyz/members/api/send-magic-link/", {
            method: "POST",
            body: JSON.stringify({name, email, "requestSrc": "portal"}),
            headers: {
                "Accept": "*/*",
                "Content-Type": "application/json"
            }
        }).then(() => {

        }).catch(() => {

        })
        
    }

    const toggleNewsletter = () => {
        hidden = !hidden;
    }
</script>

<button class="subscribe" on:click={toggleNewsletter}>
    <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 352c-16.53 0-33.06-5.422-47.16-16.41L0 173.2V400C0 426.5 21.49 448 48 448h416c26.51 0 48-21.49 48-48V173.2l-208.8 162.5C289.1 346.6 272.5 352 256 352zM16.29 145.3l212.2 165.1c16.19 12.6 38.87 12.6 55.06 0l212.2-165.1C505.1 137.3 512 125 512 112C512 85.49 490.5 64 464 64h-416C21.49 64 0 85.49 0 112C0 125 6.01 137.3 16.29 145.3z"/></svg>
</button>
  
<div id="portal-page" class="portal" class:hidden>
    <img alt="site-logo" src="https://ghost.alfheimr.xyz/content/images/2022/01/logo-big.png" width="960" height="960"/>
    <h2>Álfheimr</h2>
    <div>
        <label for="input-name">Name</label>
        <input id="input-name" bind:value={name} placeholder="Your majesty's name"/>
    </div>
    <div>
        <label for="input-email">Email</label>
        <input id="input-email" type="email" bind:value={email} placeholder="xxxx@xxxxx.com"/>
    </div>
    <button on:click={submit} type="submit">Sign up</button> 
</div>

<style>
    button {
        cursor: pointer;
    }
    .subscribe {
        position: fixed;
        bottom: 1.75rem;
        right: 1.75rem;
        border-radius: 50%;
        border: var(--color-accent) solid 2px;
        height: 3rem;
        width: 3rem;
        color: var(--color-accent);
        background-color: transparent;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .subscribe svg {
        height: 1.5rem;
        width: 1.5rem;
    }
    .portal {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        height: 25rem;
        width: 20rem;
        padding-left: 2rem;
        padding-right: 2rem;
        background-color: white;
        border-radius: 5px;
        box-shadow: 0 3.8px 2.2px rgb(0 0 0 / 3%), 0 9.2px 5.3px rgb(0 0 0 / 4%), 0 17.3px 10px rgb(0 0 0 / 5%), 0 30.8px 17.9px rgb(0 0 0 / 6%), 0 57.7px 33.4px rgb(0 0 0 / 7%), 0 138px 80px rgb(0 0 0 / 10%);
    }
    .portal img {
        height: 2.5rem;
        width: 2.5rem;
        display: block;
        margin-left: auto;
        margin-right: auto;
        margin-top: 2.5em;
    }
    h2 {
        color: var(--color-primary);
        text-align: center;
        font-size: 1.3rem;
        margin-top: 25px;
        padding-bottom: 1.3rem;
    }
    label {
        font-family: var(--font-secondary);
        font-size: 0.7em;
    }
    input {
        display: block;
        margin-left: auto;
        margin-right: auto;
        box-sizing: border-box;
        font-size: 0.8rem;
        background: transparent;
        border: 1px solid var(--grey12);
        border-radius: 5px;
        height: 40px;
        width: 100%;
        padding: 0 12px;
        margin-bottom: 18px;
        box-shadow: 0px 2px 4px 0px rgb(0 0 0 / 7%), 0px 1px 1.5px 0px rgb(0 0 0 / 5%);
    }
    .portal button {
        color: rgb(255, 255, 255);
        background-color: rgb(210, 157, 0);
        opacity: 1;
        pointer-events: auto;
        width: 100%;
        border: none;
        font-family: var(--font-secondary);
        font-size: 0.8em;
        margin-top: 1rem;
        border-radius: 5px;
    }
    .hidden {
        display: none;
    }
    @media (prefers-color-scheme: dark) {
        .portal {
            background-color: var(--color-bg-secondary);
            box-shadow: none;
        }
        input {
            background-color: var(--color-bg);
        }
    }
    @media (max-width: 680px) {
        .subscribe {
            display: none !important;
        }
    }
</style>