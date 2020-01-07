import { hello2 } from "@light0x00/moduleA";

console.log(hello2)
hello2().then(
	(e) => {
		let h = document.createElement("h1");
		h.innerText = e;
		document.body.appendChild(h);
	}
)
