export const Compile = async (code, inp, out, current) => {
  let url = "http://localhost:5000/";

  let data = {
    code,
    inp,
    out,
    type: "cpp",
  };
  if (current.includes(".py")) data.type = "py";
  let res = await fetch(`${url}compile`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res.json();
};
