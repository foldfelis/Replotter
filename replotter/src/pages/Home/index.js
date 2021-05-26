import {useState} from 'react'
import Plot from 'react-plotly.js';

function getData() {
    return fetch(
        'http://127.0.0.1:8080/api/surface/-10/0.1/10',
        {method: "GET"}
    ).then(
        res => res.json()
    )
}

const Home = () => {getData();
    const [axisData, setAxisData] = useState([0])
    const [zData, setZData] = useState([0])

    async function updateData() {
        let data = await getData()
        setAxisData(data[0])
        setZData(data[1])
    }

    const dataArgv = [{
        x: axisData,
        y: axisData,
        z: zData,

        type: 'surface',
        opacity: 0.95,
        cauto: true,
        cmid: 0
    }]

    const layoutArgv = {
        title: 'Wigner Function',
        autosize: true,
        width: 800,
        height: 600,
        margin: {l: 65, r: 50, b: 65, t: 90},
        x: {title: {text: 'X'}},
        y: {title: {text: 'P'}},
    }

    return <div>
        <h1>Wigner Function 3D Plot</h1>
        <Plot
            data = {dataArgv}
            layout = {layoutArgv}
        />
        <button onClick={updateData}>Update</button>
    </div>
}

export default Home
