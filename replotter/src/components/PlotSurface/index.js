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

const PlotSurface = () => {
    const [axisData, setAxisData] = useState([0])
    const [zData, setZData] = useState([0])

    async function updateData() {
        let data = await getData()
        setAxisData(data[0])
        setZData(data[1])
    }

    const contoursArgvCommon = {
        show : true,
        color: '#a0a0a0',
        highlightcolor: '#a0a0a0',
    }

    const contoursArgv = {
        x: {...contoursArgvCommon, project: {x: true}},
        y: {...contoursArgvCommon, project: {y: true}},
    }

    const sceneArgv = {
        // camera: {eye: {x: 1.87, y: 0.8, z: 0.1}},
        xaxis: {title: {text: 'X'}},
        yaxis: {title: {text: 'P'}},
        zaxis: {title: {text: 'Quasi Probability'}}
    }

    const dataArgv = [{
        x: axisData,
        y: axisData,
        z: zData,

        type: 'surface',
        cmid: 0.0,
        highlightcolor: '#ffffff',

        contours: contoursArgv,
    }]

    const layoutArgv = {
        title: 'Wigner Function',
        autosize: false,
        width: 700,
        height: 600,
        margin: {l: 65, r: 50, b: 65, t: 90},
        scene: sceneArgv,
    }

    return <div>
        <h1>Wigner Function 3D Plot</h1>
        <Plot data={dataArgv} layout = {layoutArgv}/>
        <button onClick={updateData}>Update</button>
    </div>
}

export default PlotSurface
