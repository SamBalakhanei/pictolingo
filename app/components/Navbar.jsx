import { getServerSession } from "next-auth";
import Link from "next/link";
import { authConfig } from "../../lib/auth";



export default async function Navbar() {
  const session = await getServerSession(authConfig);
  if(session){
    return (
      <>
        <link
          rel="stylesheet"
          href="https://www.w3schools.com/w3css/4/w3.css"
        ></link>
  
        <div className="w3-top">
          <div className="w3-bar w3-white w3-wide w3-padding w3-card ">
            <Link href='/' className="w3-bar-item w3-button"><b>Picto</b>Lingo</Link>
            <div className="w3-right w3-hide-small">
            <Link href='/learn' className="w3-bar-item w3-button">Learn</Link>
            {/* <Link href='/' className="w3-bar-item w3-button">Study</Link>
            <Link href='/' className="w3-bar-item w3-button">Test</Link> */}
            <Link href='/api/auth/signout' className="w3-bar-item w3-button ring-2 ring-offset-blue-300">Sign Out</Link>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <link
          rel="stylesheet"
          href="https://www.w3schools.com/w3css/4/w3.css"
        ></link>
  
        <div className="w3-top">
          <div className="w3-bar w3-white w3-wide w3-padding w3-card ">
            <Link href='/' className="w3-bar-item w3-button"><b>Picto</b>Lingo</Link>
            <div className="w3-right w3-hide-small">
            <Link href='/learn' className="w3-bar-item w3-button">Learn</Link>
            {/* <Link href='/' className="w3-bar-item w3-button">Study</Link>
            <Link href='/' className="w3-bar-item w3-button">Test</Link> */}
            <Link href='/login' className="w3-bar-item w3-button ring-2 ring-offset-blue-300">Login</Link>
            </div>
          </div>
        </div>
      </>
    );
  }




    
  }
  