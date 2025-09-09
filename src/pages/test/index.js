function Test(){
 const handleSignout = async () => {
    try{
        const res = await fetch("/api/session/signout",{
            method:'POST',
            headers: { "Content-Type": "application/json" },
        })
        const data = await res.json();
        alert(JSON.stringify(data));
    }catch (err) {
      console.error(err);
    }
 }

  const handleSignup = async () => {
    try {
      const res = await fetch("/api/session/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email:'ashton.howard@recro.com', password:'password', name:'Ashton Howard' }),
      });
      const data = await res.json();
      alert(JSON.stringify(data));
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogin = async () => {
  try {
    const res = await fetch("/api/session/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "ashton.howard@recro.com",
        password: "password",
      }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Logged in!");
    } else {
      alert("Login failed: " + data.error);
    }
  } catch (err) {
    console.error(err);
  }
};


    return (
        <>
    <button onClick={handleSignup} className="border">Signup</button>
    <button onClick={handleLogin} className="border bg-white text-black">Login</button>
    <button onClick={handleSignout} className="border">Sign Out</button>
    </>
)
}
export default Test