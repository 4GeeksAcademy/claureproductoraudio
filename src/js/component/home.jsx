import React, { useState, useEffect, useRef } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {

	const [cancion, setCancion] = useState([])
	const [url, setUrl] = useState("")
	const audio = useRef();



	function obtenerInfo() {
		fetch('https://playground.4geeks.com/apis/fake/sound/songs')//especificamos la url donde vamos a buscar info
			.then((response) => response.json()) // la info que llega la voy a convertir en un formato json
			.then((data) => setCancion(data))// convierte la info en un objeto, para que lo procesemos como queramos
			.catch((error) => console.log(error))// si hay un error me muestra cual fue

	}
	console.log(cancion);

	function reproducir(url) {
		audio.current.play()
		console.log(url);
		console.log("Funciona el play");
	}
//quiero crear una funcion pausa cuando hago click en icono pausa
	function pausa(){
		if (condition) {
			
		}
	}

	//funcion avanzar cuando hago click en el icono adelatar 


	// useEffect(funcion anonima,array vacio)
	useEffect(function () {// onload => ejecutar codigo ni bien cargue el componente
		//bloque de codigo que queremos ejecutar
		obtenerInfo()
		console.log("cancion")
	}, [])


	return (
		<div className="container">
			<div className="row">
				<div className=" bg-black text-white col-12 ">
					
					<ol className="list-group list-group-numbered">
						{cancion.map(function (item) { return <li className=" bg-dark  text-white list-group-item" 
						key={item.id}
						onClick={function(){setUrl(item.url)}}>
							{item.name}
							</li> })}
					</ol>
			</div>
				<div>
				<div>
					<footer className="navbar bg-dark fixed-bottom">
						<div className="container">
						<a className="navbar-brand m-auto p-1" href="#">
						<i className="fa fa-backward me-4" style={{color: "#ffffff"}}></i>						
						<i onClick={()=>reproducir()} className="fa fa-play" style={{color: "#fbfcfe"}}></i> 
						{/* <i class="fa fa-pause" style={{color: "#ffffff"}}></i> */}
						<i className="fa fa-forward ms-4" style={{color: "#ffffff"}}></i>
						</a>
						</div>
						<audio ref={audio} src={"https://assets.breatheco.de/apis/sound/" + url}>
						</audio>
					</footer>
				</div>
				</div>
			</div>
		</div>
	);
};

export default Home;






