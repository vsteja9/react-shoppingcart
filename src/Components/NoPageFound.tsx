import notfound from "./../notfound.png";
export default function NoPageFound() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop:100
      }}
    >
      <img src={notfound} height={600} width={600} />
    </div>
  );
}
