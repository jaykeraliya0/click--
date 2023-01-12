const display = (data) => {
  document.getElementById("display").innerText = JSON.stringify(data);
};

const getData = async () => {
  const res = await fetch("http://localhost:3000/click", {
    method: "GET",
  });
  const data = await res.json();
  display(data);
  return data;
};

const clickLink = async (link) => {
  const res = await fetch("http://localhost:3000/click", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      link: link,
    }),
  });
  const data = await res.json();
  return data;
};

const resetData = async () => {
  const res = await fetch("http://localhost:3000/click", {
    method: "DELETE",
  });
  const data = await res.json();
  display(data);
  return data;
};

document.getElementById("l1").addEventListener("click", (e) => {
  clickLink("l1");
});

document.getElementById("l2").addEventListener("click", (e) => {
  clickLink("l2");
});

document.getElementById("getData").addEventListener("click", (e) => {
  getData();
});

document.getElementById("resetData").addEventListener("click", (e) => {
  resetData();
});
