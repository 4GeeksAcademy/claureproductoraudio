import React, { useState, useEffect, useRef } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {

	const [cancion, setCancion] = useState([])
	const [url, setUrl] = useState("")
	const audio = useRef();
	const [sonando, setSonando] = useState(false)

	async function obtenerInfo() {
		try {
			let response = await fetch('https://playground.4geeks.com/apis/fake/sound/songs')//especificamos la url donde vamos a buscar info
			let data = await response.json() // la info que llega la voy a convertir en un formato json
			console.log(data)
			setCancion(data);// convierte la info en un objeto, para que lo procesemos como queramos
		} catch (error) {
			console.log(error);// si hay un error me muestra cual fu
		}
	}
		console.log(cancion);

	


	function reproducir(url) {
		setSonando(true)
		audio.current.src = "https://assets.breatheco.de/apis/sound/" + url
		audio.current.volume = 0.07;
		audio.current.play()

	}
	//quiero crear una funcion pausa cuando hago click en icono pausa
	function pausa() {
		setSonando(false)
		audio.current.pause()
	}

	//funcion retroceder cuando hago click en el icono retroceder
	function atras() {
		setSonando(true)
		let id;
		cancion.filter((item, index) => {
			if (item.url == url) {     //buscar el item que está sonando ahora (url)
				if (index==0) {
					id=cancion.length-1;

					audio.current.src = "https://assets.breatheco.de/apis/sound/" + cancion[id]?.url
					setUrl(cancion[id]?.url)
					audio.current.play()
				}
				id = index - 1;

				console.log(cancion[id].url, "cancionatras")
				audio.current.src = "https://assets.breatheco.de/apis/sound/" + cancion[id].url
				setUrl(cancion[id].url)
				audio.current.play()
			}
		})
		console.log(audio.current.src, "atras");
	}

	//funcion adelantar cuando hago click en el icono avanzar 
	function adelantar() {
		setSonando(true)
		let id;
		cancion.filter((item, index) => {
			if (item.url == url) {     //buscar el item que está sonando ahora (url)
				if (index==18) {
					// id=cancion.length;

					audio.current.src = "https://assets.breatheco.de/apis/sound/" + cancion[0]?.url
					setUrl(cancion[0]?.url)
					audio.current.play()
				}
				id = index +1;

				console.log(cancion[id].url, "cancionadelante")
				audio.current.src = "https://assets.breatheco.de/apis/sound/" + cancion[id].url
				setUrl(cancion[id].url)
				audio.current.play()
			}
		})
		console.log(audio.current.src, "adelante");
	}
	


	// useEffect(funcion anonima,array vacio)
	useEffect(function () {// onload => ejecutar codigo ni bien cargue el componente
		//bloque de codigo que queremos ejecutar
		obtenerInfo()
		console.log("cancion")
	}, [])


	return (
		<div className="container">
			<div className="row">
				<div className=" bg-black text-white col-12 mb-5">

					<ol className="list-group list-group-numbered">
						{cancion.map(function (item) {
							return <li className=" bg-dark  text-white list-group-item colorClaro"
								key={item.id}
								onClick={function () {
									setUrl(item.url)
									reproducir(item.url)
								}}>
								{item.name}
							</li>
						})}
					</ol>
				</div>
				<div>
					<div>
						<footer className="navbar bg-dark fixed-bottom footer">
							<div className="container">
								<a className="navbar-brand m-auto p-1" href="#">
									<i onClick={() => atras()} className="fa fa-backward me-4" style={{ color: "#ffffff" }}></i>
									{sonando === false
										? <i onClick={() => reproducir()} className="fa fa-play" style={{ color: "#fbfcfe" }}></i>
										: <i onClick={() => pausa()} className="fa fa-pause" style={{ color: "#fbfcfe" }}></i>
									}

									<i onClick={() => adelantar()} className="fa fa-forward ms-4" style={{ color: "#ffffff" }}></i>
								</a>
							</div>
							<audio ref={audio} src="">
							</audio>
						</footer>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;




