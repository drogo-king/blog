<script lang="ts">
    import {fly, fade} from "svelte/transition";
    let hidden = true;
    let name;
    let email;
    const message = {
        success: "Success! Check your email for the invitation!",
        failure: "Registration fail! Try again or contact the author."
    };
    let current: null|"success"|"failure" = null;

    const success = () => {
        current = "success";
        setTimeout(() => {
		    current = null;
        }, 3000);
    }

    const failure = () => {
        current = "failure";
        setTimeout(() => {
		    current = null;
        }, 3000);
    }

    const submit = () => {
        fetch("https://ghost.alfheimr.xyz/members/api/send-magic-link/", {
            method: "POST",
            body: JSON.stringify({name, email, "requestSrc": "portal"}),
            headers: {
                "Accept": "*/*",
                "Content-Type": "application/json"
            }
        }).then(resp => {
            hidden = true
            if (resp.status == 201) success() 
            else failure()
        })
    }

    const toggleNewsletter = () => {
        hidden = !hidden;
    }
</script>

<button class="subscribe" on:click={toggleNewsletter}>
    {#if !hidden}
        <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"/></svg>
    {:else}
        <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 352c-16.53 0-33.06-5.422-47.16-16.41L0 173.2V400C0 426.5 21.49 448 48 448h416c26.51 0 48-21.49 48-48V173.2l-208.8 162.5C289.1 346.6 272.5 352 256 352zM16.29 145.3l212.2 165.1c16.19 12.6 38.87 12.6 55.06 0l212.2-165.1C505.1 137.3 512 125 512 112C512 85.49 490.5 64 464 64h-416C21.49 64 0 85.49 0 112C0 125 6.01 137.3 16.29 145.3z"/></svg>
    {/if}
</button>

{#if !hidden}
    <div transition:fly={{y:-150, duration: 300}} id="portal-page" class="portal">
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
        <button on:click={submit} type="submit">Subscribe!</button> 
    </div>
{/if}

{#if current}
    <div class="{current} toast" in:fly={{ y: -600, duration: 400 }} out:fade>
        <span role="status">
            {message[current]}
        </span>
    </div>
{/if}

<style>
    button {
        cursor: pointer;
    }
    .subscribe {
        position: fixed;
        bottom: 1.75em;
        right: 1.75em;
        border-radius: 50%;
        border: var(--color-accent) solid 2px;
        height: 2.5em;
        width: 2.5em;
        color: var(--color-accent);
        background-color: transparent;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .subscribe svg {
        height: 1.3em;
        width: 1.3em;
    }
    .portal {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        height: 23rem;
        width: 17rem;
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
    .toast {
        display: flex;
		width: max-content;
		justify-content: space-between;
		align-items: center;
		text-decoration: none;
		font-family: inherit;
		font-weight: 400;
		font-size: 0.9em;
		padding: 0.5em;
		min-width: 300px;
		max-width: calc(100vw - 2em);
		border-radius: var(--as-toast-border-radius, 0.5em);
		color: var(--as-toast-color, black);
		backdrop-filter: var(--as-toast-backdrop-filter, none);
		-webkit-backdrop-filter: var(--as-toast-backdrop-filter, none);
		box-shadow: var(
			--as-toast-shadow,
			0 0.3px 1.4px rgba(0, 0, 0, 0.068),
			0 0.7px 3.5px rgba(0, 0, 0, 0.098),
			0 1.4px 7.1px rgba(0, 0, 0, 0.122),
			0 2.9px 14.6px rgba(0, 0, 0, 0.152),
			0 8px 40px rgba(0, 0, 0, 0.22)
		);
        position: fixed;
		top: 1em;
		right: 1em;
        z-index: 3;
    }
    .success {
        color: var(--as-toast-info-color, var(--as-toast-color, black));
		background: var(--color-accent);
    }
    .failure {
        color: var(--as-toast-warn-color, var(--as-toast-color, black));
		border-color: var(--as-toast-warn-border-color, #c92626);
		background: var(--as-toast-warn-background, #efa9a9);
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
    @media (max-width: 700px) {
        .subscribe {
            display: none !important;
        }
    }
</style>