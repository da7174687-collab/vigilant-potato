/*
  NumberScope + NumVerify
  IMPORTANT: do not publish a real API key in a public GitHub repository.
  This direct-client demo is suitable for testing only. For production,
  proxy the request through a serverless/backend endpoint.
*/
const API_KEY = "PASTE_YOUR_NUMVERIFY_API_KEY_HERE";
const input = document.querySelector("#phone");
const button = document.querySelector("#lookup");
const error = document.querySelector("#error");
const panel = document.querySelector("#panel");

function $(id){return document.querySelector(id)}
function set(id,value){$(id).textContent = value || "Not available"}

button.onclick = async () => {
  error.textContent = "";
  const number = input.value.trim();
  if(!number){ error.textContent = "Enter a phone number."; return; }
  if(API_KEY.includes("PASTE_")){
    error.textContent = "Add your NumVerify API key in script.js first.";
    return;
  }

  button.disabled = true;
  button.textContent = "Checking…";

  try{
    const url = `https://apilayer.net/api/validate?access_key=${encodeURIComponent(API_KEY)}&number=${encodeURIComponent(number)}`;
    const response = await fetch(url);
    const data = await response.json();

    if(data.success === false){
      throw new Error(data.error?.info || "API request failed.");
    }

    set("international", data.international_format);
    set("country", data.country_name);
    set("countryCode", `${data.country_code || "—"} ${data.country_prefix || ""}`);
    set("location", data.location);
    set("carrier", data.carrier);
    set("lineType", data.line_type);
    set("valid", data.valid ? "● Number validated" : "● Number not validated");

    panel.classList.remove("hidden");
    panel.scrollIntoView({behavior:"smooth",block:"start"});
  }catch(e){
    error.textContent = e.message || "Unable to contact the API.";
  }finally{
    button.disabled = false;
    button.textContent = "Lookup →";
  }
};

input.addEventListener("keydown", e => { if(e.key === "Enter") button.click(); });
