<script>
function show(id){
  document.querySelectorAll('.container').forEach(el=>{
    el.classList.add('hidden');
  });

  setTimeout(()=>{
    document.getElementById(id).classList.remove('hidden');
  },150);
}

/* ✅ NEW: SEND DATA TO AI */
async function analyzeProfile() {
  const name = document.getElementById("name")?.value || "";
  const experience = document.getElementById("experience")?.value || "";

  // ✅ Show loading UI
  document.getElementById("dashboard").innerHTML = `
    <div class="card">
      <h2>⚡ JOBMETRIX AI Processing...</h2>
      <p>Analyzing your profile...</p>
    </div>
  `;

  show("dashboard");

  try {
    const res = await fetch("https://mtas-backend.onrender.com/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        experience
      })
    });

    const data = await res.json();

    // ✅ Render AI result
    document.getElementById("dashboard").innerHTML = `
      <div class="card">
        <h2>🚀 JOBMETRIX AI Analysis</h2>

        <p><b>Name:</b> ${data.name}</p>
        <p><b>Experience Level:</b> ${data.experience_level}</p>

        <p><b>Skills:</b><br>${data.skills.join(", ")}</p>

        <p><b>Recommended Roles:</b><br>${data.recommended_roles.join(", ")}</p>

        <button onclick="show('landing')">Back Home</button>
      </div>
    `;

  } catch (error) {
    document.getElementById("dashboard").innerHTML = `
      <div class="card">
        <h2>❌ Error</h2>
        <p>Could not process AI request.</p>
        <button onclick="show('landing')">Back</button>
      </div>
    `;
  }
}
</script>
``