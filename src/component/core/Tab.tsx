import { Box } from '@mui/material'
import { FC, useState } from 'react'
import styled from 'styled-components'
import { mainBgColor, subBgColor } from '../../constain/color'

interface tabItem {
    name: string,
    component: JSX.Element
}

// interface TabProps {
//     tabItems: tabItem[]
// }
const TabStyled = styled.div`
    margin-top: 20px;
    
    .tab_header {
        display:flex;
        border:1px solid ${subBgColor};
        width:fit-content;
        .tab_header-item {
            padding:10px;
            cursor: pointer;
            background-color: ${subBgColor};
        }
        .tab_header-item.active{
            background-color: ${mainBgColor};
            
        }

    }
    .tab_body{
        padding:10px;
        max-width:100%;
        width:600px;
        border:1px solid ${subBgColor};
        box-shadow: 0 0 7px 0 rgba(0,0,0,0.2);
    }
`



function Tab({ tabItems }: { tabItems: tabItem[] }) {
    const [activeTab, setActiveTab] = useState(0)
    return (
        <TabStyled>
            <div className="tab_header">
                {tabItems.map((item, index) => (
                    <div
                        key={index}
                        className={`tab_header-item ${activeTab === index ? "active" : ""}`}
                        onClick={() => setActiveTab(index)}
                    >
                        {item.name}
                    </div>
                ))}
            </div>
            <div className="tab_body">
                {tabItems.map((item, index) => <div key={index} hidden={index !== activeTab} >
                    {item.component}
                </div>)}
            </div>
        </TabStyled>
    )

}

export default Tab