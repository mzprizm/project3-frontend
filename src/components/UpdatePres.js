import React, {useState, useEffect} from "react"
import '../css/pres.css'
import UpdateSect from './UpdateSect'
import {updatePres, getPresById} from '../services/api-helper'
import {createSect} from '../services/section-api-helper'
import {Redirect, Link} from 'react-router-dom'


function UpdatePres(props) {   
    console.log('props at top', props.presentation)
    const [name, setName] = useState() 
    const [currentPresentation, setCurrentPresentation] = useState()
    const [currentSections, setCurrentSections] = useState([])
    const [showEdit, setShowEdit] = useState(false)
    const [createForm, setCreateForm]= useState(false)
    const [creatSectTitle, setcreatSectTitle] =useState('')
    const [createNewTime, setCreateNewTime] = useState('')
   
    
    useEffect(() => {
        const APICall = async() => {
            if(props.presentation){
                setName(props.presentation.name)
                setCurrentPresentation(props.presentation)
                setCurrentSections(props.presentation.sections)
            }
        }
       APICall()
    }, []);
    
    let totalTime = 0


//=========  

    console.log("here is props.presention",props.presentation )//_id

    const handleAddSection = async(e)=>{
        e.preventDefault()
        const json = await createSect(props.presentation._id,{"title":creatSectTitle, "time":createNewTime})
        renderPage()
        setcreatSectTitle("")
        setCreateNewTime("")
    }
   const handleNewSectionTitle =(e) =>{
    setcreatSectTitle(e.target.value)
    renderPage()
    
   }

    const handleNewSectionTime =(e) =>{
        setCreateNewTime(e.target.value)
        renderPage()
       }

 

    if(!props.presentation){
        return <Redirect to="/"/>
    }

    console.log("current", currentPresentation)
    
    const nameChange = (e) => {
        setName(e.target.value)
    }

    const presNameSubmit = async(e) => {
        e.preventDefault()
        const json = await updatePres(currentPresentation._id, {"name": name})
        setShowEdit(false)
        renderPage()
        // getSections()
    }


    

    const renderPage = async() => {
        console.log("yes")
        const json = await getPresById(props.presentation._id)
        setName(json.name)
        setCurrentPresentation(json)
        setCurrentSections(json.sections)
    }


    const renderSections = currentSections.map((section, index) => {
        totalTime += section.time
        return (
           <UpdateSect section={section} inedx={index} renderPage={renderPage}/>
        
        )
    })
    const showSectionCreateForm =()=>{
        setCreateForm(!createForm)
    }

    const Blastoff = async() => {
        const presentation = await getPresById(props.presentation._id)
        props.clickPresentation(presentation)
    }
            
    return (
        <div className="updatePresMain">
            <h2><i onClick= {()=>setShowEdit(!showEdit)} class="far fa-edit"></i>
            
            {
                 !showEdit
                 &&
                 <h2>{name}</h2>

             }
             </h2>
           
            
            
            {
                showEdit 
                    &&
                <form className="nameForm" onSubmit={presNameSubmit}>
                    
                        <p>
                            <label>Presentation Name: </label>
                            <input
                                 type="text" 
                                 value={name} 
                                 onChange={nameChange} 
                                 required="required"
                                 />
                        </p>
                    <button>update</button>
                </form>
             }
            
        {renderSections}
        

        {!createForm&&<button onClick ={showSectionCreateForm}>Add Section</button>}
        {createForm &&  <form onSubmit ={handleAddSection}>
               <p> <label>Title<input type ="text" onChange={handleNewSectionTitle} value ={creatSectTitle} required="required">   
                </input></label></p>
                <p> <label>Time:<input type ="text" onChange={handleNewSectionTime} value ={createNewTime} required="required">   
                </input></label></p>
                <button>+ Section</button>
            </form>}


            <p className="time">Total time: {totalTime}</p>
            <Link to="/pres"><button className="doneButton" onClick={Blastoff}>Done!</button></Link>
        </div>
    )
}

export default UpdatePres

//remember to show create form again or delete the hiding functionality - create a done section to hide