// import "./hello-world-button.scss"

class HelloWorldButton {
    buttonCssClass = 'hello-world-button';
    render() {
        const button = document.createElement('button');
        const body = document.querySelector('body');
        button.innerHTML = "Hello world";
        button.classList.add(this.buttonCssClass)
        button.addEventListener('click', function () {
            const p = document.createElement('p');
            p.innerHTML = 'Hello world';
            p.classList.add('hello-world-text')
            body.appendChild(p);
        })
        body.appendChild(button);
    }
}

export default HelloWorldButton;