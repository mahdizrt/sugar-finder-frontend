import { Forms } from "../components";

function UnConfirmed() {
  return (
    <div>
      <Forms query="?confirmed=false" />
    </div>
  );
}

export { UnConfirmed };
