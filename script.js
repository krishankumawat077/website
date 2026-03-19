const API = "https://campus-connect-e5zh.onrender.com/";  

document.getElementById("studentForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    name: name.value,
    branch: branch.value,
    year: year.value,
    skills: skills.value
  };

  await fetch(API + "/students", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  alert("Submitted!");
  window.location.href = "view.html";
});

async function loadStudents() {
  const res = await fetch(API + "/students");
  const students = await res.json();

  students.forEach(s => {
    document.getElementById("students").innerHTML += `
      <div>
        <h4>${s.name}</h4>
        <p>${s.branch} | Year ${s.year}</p>
        <p>${s.skills}</p>
      </div>
    `;
  });
}

loadStudents();