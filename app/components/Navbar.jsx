import { getServerSession } from "next-auth";
import Link from "next/link";
import { authConfig } from "../../lib/auth";



export default async function Navbar() {
  const session = await getServerSession(authConfig);

  return (
    <>
      <link
        rel="stylesheet"
        href="https://www.w3schools.com/w3css/4/w3.css"
      ></link>
      <div className="w3-top">
        <div className="w3-bar w3-wide w3-padding w3-card" style={{backgroundColor: "#516cad"}}>
          <Link href='/' className="w3-bar-item text-2xl" style={{color : 'white'}}><b>Picto</b>Lingo</Link>
          <div className="w3-right w3-hide-small">
          <Link href='/learn' className="w3-bar-item hover:bg-sky-700 rounded-sm mt-1" style={{color : 'white', fontSize : '1rem'}}>Learn</Link>
          
          {session && (
            <Link href='/signout' className="w3-bar-item hover:bg-sky-700 rounded-sm mt-1" style={{color : 'white', fontSize : '1rem'}}>Sign Out</Link>
          )}
          {!session && (
            <Link href='/login' className="w3-bar-item hover:bg-sky-700 rounded-sm mt-1" style={{color : 'white', fontSize : '1rem'}}>Login</Link>
          )}
          </div>
        </div>
      </div>
    </>
  );
  




    
  }
  