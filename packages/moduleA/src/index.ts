export async function hello2() : Promise<string>{
	return new Promise((rs,rj)=>{
		rs("hello!!!")
	});
}