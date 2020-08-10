import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

var Data = [];





const TableCell = (props) => {
	return <td key={Math.floor(Math.random())}> {props.cell} </td>
}

const TableRow = (props) => {
	
	return (
		<tr>
			{	
				props.data.split(props.delimiter).map((cell, index) => {
					return <TableCell key={index} cell={cell} /> 
				})	
			}			
		</tr>
	)

}

const Table = (props) => {

	const [delimiter, setDelimiter] = useState(';'); 
	const [numberOfRows, setRow] = useState(2);
	const [start, changeStart] = useState(0);
	const [page, changePage] = useState(1);
	const [slide, changeSlide] = useState(0);
	const [selectedFile, uploadFile] = useState(null);
	const [fileSeleted, changeFile] = useState(false)


	const uploadToServer = () => {
		const data = new FormData()
		data.append('file', selectedFile)

		  axios.post("http://127.0.0.1:8080/upload", data, { // receive two parameter endpoint url ,form data 
	      })
	      .then(res => { // then print response status
	        console.log(res.data)
	        Data = res.data;
	        document.getElementById('right').click();
	        document.getElementById('left').click();
	      })
	      changeFile(true)

	}
	

		
	const DelimiterChange = () => {
		if(document.getElementById('delimiterInput').value !== '')
			setDelimiter(document.getElementById('delimiterInput').value);
		else 
			setDelimiter(';'); 
	}


	const RowChange = () => {
		if(document.getElementById('rowInput').value !== ''){
			setRow(parseInt(document.getElementById('rowInput').value));
		}
		else{
			setRow(2);
			
		}
		changeStart(0);
		changePage(1);
		console.log(' numer of rows changed')
		changeSlide(0)
	}

	const moveLeft = () => {
		if(start - numberOfRows >= 0){
			changeStart(start - numberOfRows)
			changePage(page - 1)
			changeSlide(slide - 1)
		}
			
		//console.log('start - numberOfRows', start - numberOfRows)

	}

	const moveRight = () => {
		if(start + numberOfRows < Data.length){
			changeStart(start + numberOfRows)
			changePage(page+1)
			changeSlide(slide + 1)
		}
		
		//console.log('start + numberOfRows', start + numberOfRows)

	}



	const sliderChange = () => {
		// console.log(document.getElementById('slide').min)
		// console.log(document.getElementById('slide').max)
		changeSlide(parseInt(document.getElementById('slide').value))

		changeStart(parseInt(document.getElementById('slide').value)*numberOfRows)
		changePage(parseInt(document.getElementById('slide').value ) + 1)
	}

	const onFileSelect = (event) => {
		console.log(event.target.files[0])
		uploadFile(event.target.files[0])
	}

	

	if(fileSeleted === false)
		return (
			<div className="text-center">
				<h1 className="display-3 font-weight-bold text-dark">Upload text file here </h1>
				<input className="my-3 form-control-file bg-dark text-light" type='file' name='file' onChange={onFileSelect} />
				<button style={{ borderRadius : 9999 }} className="btn bg-dark text-white font-weight font-weight-bold" onClick={uploadToServer}>Upload</button>
			</div>
		)

	else
		return (
			<div className="text-center">
				<h1 className="display-3 font-weight-bold text-dark">Text to Table Tool </h1>
				<div className="container m-0 row text-center">
					<label className="col-3 font-weight-bold text-dark text-right">Delimiter: </label>
					<input type='text' className='form-control col-3' id='delimiterInput' onChange={DelimiterChange} placeholder='delimiter'/>
					<label className="col-3 font-weight-bold text-dark text-right">No. of Rows: </label>
					<input type='number' className='form-control col-3' id='rowInput' onChange={RowChange} placeholder='rows'/>
				</div>
				<br />

				<table className="table table-light table-bordered table-hover text-center text-centerr col-12 ">
				<tbody>
				{
					Data.slice(start, start + numberOfRows).map((row,index) => {
						return <TableRow key={index} data={row} delimiter={delimiter} />
					})
				}
				</tbody>
				</table>

				<div className='col-12 container text-center row m-0'>
					<p className='container-fluid col-12 font-weight-bold text-dark'>{page} </p>
					<button id='left' className="bg-dark text-white font-weight-bold col-1 btn" onClick={moveLeft} style={{ borderRadius: 9999}}> Prev </button>
					<input type="range" className='form-control-range col-10' id='slide'  max={Math.ceil(Data.length/numberOfRows) - 1} min='0' value={slide} onChange={sliderChange} />
					<button id='right'className="bg-dark text-white font-weight-bold col-1 btn" onClick={moveRight} style={{ borderRadius: 9999}}> Next </button>
				</div>
				<div className="col-12 container text-center row mx-0 my-1">				
					<button className="bg-dark text-white font-weight-bold col-1 btn mx-auto" style={{ borderRadius: 9999}} onClick={ () => changeFile(false) }>Back</button>
				</div>

			</div>
			)
}



ReactDOM.render(
		<Table />,
		document.getElementById('root')
	);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//
// serviceWorker.unregister();

