import "./Swiper.css";
export function NavigationDot(key: any) {
  console.log("key", key);
  return (
    <div
      className="navigationDot"
      onClick={() => {
        console.log("frm onClick", key);
      }}
    ></div>
  );
}
export default function NavigationDots({ dotsCount }: { dotsCount: number }) {
  return (
    <div className="navigationDots">
      {Array.from({ length: dotsCount }, (_, index) => {
        return <NavigationDot key={index} />;
      })}
    </div>
  );
}
