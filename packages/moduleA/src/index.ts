import { add } from "lodash";
export async function hello2(): Promise<string> {
	return new Promise((rs, rj) => {
		console.log("!!")
		rs("hello!!!" + add(1, 2))
	});
}