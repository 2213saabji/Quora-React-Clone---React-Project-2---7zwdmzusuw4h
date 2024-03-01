'use client'
import React, { useEffect, useState } from 'react'
import { baseurl} from '../(navbar)/constant';
import Userdetails from './userdetails';


export default function CommentMessage({ id, refreshcommentdiv, toggle, settoggle, childdata, routetouserpage, themecheck }) {
    const [data, setdata] = useState();
    const [marginstatus, setmarginstatus] = useState(false);

    //---------------------------Fetch all the comments--------------------------

    const fetchcomment = async () => {
        try {
            const response = await (await fetch(`${baseurl}/quora/post/${id}/comments`,
                {
                    method: "GET",
                    headers: {
                        projectID: "7zwdmzusuw4h",
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
                    }
                }
            )).json();
            setdata(response.data);
        } catch (error) {
      console.log(error);

        }
    }

    useEffect(() => {
        if (id != "") {
            fetchcomment();
        }
        else {
            setdata(childdata);
// --------------------------------------marginLeft if comments are child--------------------------------------
            setmarginstatus(true);
        }
    }, [])

    return (
        <>
            {data &&
                data.map((item, index) => (
                    <div className={`w100per mt10  ${themecheck("brdrlightgray", "brdrllgray")}`} key={index} onClick={(e) => { e.stopPropagation() }}>
                        <div>
                            <Userdetails refreshcommentdiv={refreshcommentdiv} toggle={toggle} settoggle={settoggle} fetchcomment={fetchcomment} itemid={item._id} itempost={item.post} themecheck={themecheck}  marginstatus={marginstatus} routetouserpage={routetouserpage} authorid={item.author} itemcontent={item.content} />
                        </div>
                        <div>
                            {item.children && <CommentMessage id={""} refreshcommentdiv={refreshcommentdiv} childdata={item.children} toggle={toggle} settoggle={settoggle} routetouserpage={routetouserpage} themecheck={themecheck} />}
                        </div>
                    </div>
                ))}
        </>
    )
}
