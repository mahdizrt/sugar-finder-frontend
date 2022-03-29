import { Forms } from "../components";

function Confirmed() {
  return (
    <div>
      <Forms query="?confirmed=true" />
    </div>
  );
}

export { Confirmed };
