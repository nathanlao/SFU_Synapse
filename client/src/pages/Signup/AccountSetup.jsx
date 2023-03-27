import React, { useEffect, useState } from "react"
import CourseSelector from "../../components/CourseSelector/CourseSelector"
import './AccountSetup.css'

export default function AccountSetup() {
    const bioMaxLen = 150
    const [bioLen, setBioLen] = useState(0)
    const [list, setList] = useState([])

    const [year] = useState(() => {
        return getYearAndTerm().year
    })
    
    const [term] = useState(() => {
        return getYearAndTerm().term
    })


    

    async function handleBtnClick() {
        console.log('Account setup Completed!!')
        console.log(list) // add user to these courses

        // update user table with input from bio (Users)

        // add user to the selected course groups (MemberOf)
        const bio = document.getElementById('bioTextarea')
        console.log(bio.value)


        try {
            // remove existing courses which are labeled as not to keep
            const promises1 = list.filter((item) => {
                return item.keep === false
            }).map((item) => {
                const username = 'testuser' // DEV: replace when login session implemented
                const url = `/api/${username}/${year}/${term}/${item.dep}/${item.num}/${item.section}`
                return fetch(url, { method: 'DELETE' })
            })
            await Promise.all(promises1)
            console.log('Removed courses')
            
            // add new courses
            const promises2 = list.filter((item) => {
                return item.keep && item.new_item
            }).map((item) => {
                const username = 'testuser' // DEV: replace when login session implemented
                const url = `/api/${username}/${year}/${term}/${item.dep}/${item.num}/${item.section}`
                return fetch(url, { method: 'POST' })
            })
            await Promise.all(promises2)
            console.log('Added new courses')

        }catch(err) {
            console.log(err)
        }
    }


    function checkWordCount(event) {
        console.log(event.target.value.length)
        setBioLen(event.target.value.length)
    }

    const updateList = (list) => {
        console.log(list)
        setList(list)
    }

    useEffect(() => {
        console.log('received update from child component')
        console.log(list)

    }, [list])


    // helper function
    function getYearAndTerm() {
        const time = new Date()
        const year = time.getFullYear()
        const month = time.getMonth() + 1

        if(month < 5) {
            return { year: year, term: 'spring'}
        }else if(month < 9) {
            return { year: year, term: 'summer'}
        }else {
            return { year: year, term: 'fall'}
        }
    }


    return (
        <div className="account-setup">
            <section className="wrapper">
                <h1>Account setup</h1>
                <section className="course-selection">
                    <h3>Select your enrolled courses</h3>
                    <CourseSelector year={year} term={term} updateParentList={updateList} setup={true} />
                </section>
                <section className="bio">
                    <h3>Bio</h3>
                    <textarea id="bioTextarea" onChange={checkWordCount} />
                    <small>{bioLen} / {bioMaxLen}</small>
                </section>
                <div className="submit-btn">
                    <button type="button" id="completeBtn" onClick={handleBtnClick} disabled={bioLen > bioMaxLen}>Complete account setup</button>
                </div>
            </section>
        </div>
    )
}