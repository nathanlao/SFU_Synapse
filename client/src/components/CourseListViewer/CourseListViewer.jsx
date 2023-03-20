import React, { useEffect, useState } from "react"
import './CourseListViewer.css'


export default function CourseListViewer({year, term}) {

    const [list, setList] = useState([])
    const [dep, setDep] = useState('')
    const [section, setSection] = useState('')

    const viewLevel = { deps: 0, courses: 1, sections: 2 }


    useEffect(() => {
        if(dep !== '') {
            if(section !== '') {
                getData(viewLevel.sections)
            }else {
                getData(viewLevel.courses)
            }
        }else {
            getData(viewLevel.deps)
        }
        // eslint-disable-next-line
    }, [year, term, dep, section])


    function getBody(level) {
        if(level === viewLevel.courses) {
            return JSON.stringify({ year: year, term: term, dep: dep })
        }else if(level === viewLevel.sections) {
            return JSON.stringify({ year: year, term: term, dep: dep, section: section })
        }else {
            return JSON.stringify({ year: year, term: term })
        }
    }
    
    function handleError(level) {
        if(level === viewLevel.courses) {
            alert('404 Department Not Found')
            setDep('')
        }else if(level === viewLevel.sections) {
            alert('404 Section Not Found')
            setSection('')
        }else {
            window.alert('Something went wrong.. Please try again.')
        }
    }

    function getData(level) {
        const body = getBody(level)
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: body
        }

        fetch('http://localhost:3000/admin', options).then(res => {
            if(res.status === 200) {
                res.json().then(data => {
                    setList(data)
                })
            }else {
                handleError(level)
            }
        })
    }


    function handleListItemClick(event) {
        if(dep === '') {
            setDep(event.currentTarget.id)
        }else if(section === '') {
            setSection(event.currentTarget.id)
        }
    }

    function handleBackBtnClick() {
        if(section !== '') {
            setSection('')
        }else {
            setDep('')
        }
    }


    return (
        <div className="course-list-viewer">
            <p>/{dep}{section !== '' && '/' + section}</p>

            {dep !== '' && <button onClick={handleBackBtnClick} id="backBtn" type="button">Back</button>}
            
            <ul>
                {list.map((item, index) => (
                    <li key={index} id={item.value} onClick={handleListItemClick}>
                        <span>{dep.toUpperCase()} {item.value.toUpperCase()} {item.title}</span>
                        {dep !== '' && section === '' && <button className="add-btn">Add all sections</button>}
                        {dep !== '' && section !== '' && <button className="add-btn">Add</button>}
                    </li>
                ))}
            </ul>
        </div>
    )
}