import { hello2 } from "@light0x00/moduleA";
import {join} from "lodash-es";
console.log(hello2)
hello2().then(
	(e) => {
		let h = document.createElement("h1");
		h.innerText = join(["from moduleA:",e]);
		document.body.appendChild(h);
	}
)
