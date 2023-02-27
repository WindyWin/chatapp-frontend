import { Grid } from "@mui/material";
import { Outlet } from "react-router-dom";
import ConversationSection from "../../../component/core/ConversationSection";
import { conversation } from "../../types/intex";
import HomeContainer from "./StyledHome";
const exampleConverations: conversation[] = [{
  _id: "1",
  users: [],
  name: "conversation 1",
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1_fC7oCu2V7aXXy9kRXlhJZrKcNVS9i_RGA&usqp=CAU",
  createTime: new Date,
  modifiedTime: new Date,
  // {
  //   _id:"1",
  //   avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1_fC7oCu2V7aXXy9kRXlhJZrKcNVS9i_RGA&usqp=CAU",
  //   username:"user1",
  // }
},
{
  _id: "2",
  users: [],
  name: "conversation 2",
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1_fC7oCu2V7aXXy9kRXlhJZrKcNVS9i_RGA&usqp=CAU",
  createTime: new Date,
  modifiedTime: new Date,
  // {
  //   _id:"1",
  //   avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1_fC7oCu2V7aXXy9kRXlhJZrKcNVS9i_RGA&usqp=CAU",
  //   username:"user1",
  // }
},
]
function Home() {
  return (
    <HomeContainer>
      <Grid container >
        <Grid item xs={3}>
          <div className="conversation-container">
            {exampleConverations.map((item, index) => <ConversationSection key={index} conversation={item}></ConversationSection>)}
          </div>
        </Grid>
        <Grid item xs={7}>
          <Outlet />
        </Grid>
        <Grid item xs={2}>

        </Grid>

      </Grid>
    </HomeContainer>
  );
}
export default Home;
