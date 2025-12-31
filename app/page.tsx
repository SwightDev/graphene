import {FlipClock} from "@/components/ui/flip-clock";

export function FlipClockCountdownDemo() {
  return (
    <div className="flex">
      {/* 1 day ahead */}
      <FlipClock
        countdown={true}
        targetDate={new Date(Date.now() + 1000 * 60 * 60 * 24)}
        size={"sm"}
      />
    </div>
  );
}
export default function Page() {
  return (
    <main className="min-h-screen w-full flex items-center justify-center p-8 ">
      <FlipClockCountdownDemo />
      <span className="loading loading-infinity loading-sm"></span>
    </main>
  );
}