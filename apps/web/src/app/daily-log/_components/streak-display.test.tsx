import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { StreakDisplay } from "@/app/daily-log/_components/streak-display";

describe("StreakDisplay", () => {
  it("renders the current streak count", () => {
    render(<StreakDisplay currentStreak={5} longestStreak={10} />);

    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("Day Streak")).toBeInTheDocument();
  });

  it("shows personal best when longest streak is greater than zero", () => {
    render(<StreakDisplay currentStreak={3} longestStreak={7} />);

    expect(screen.getByText("Personal Best: 7")).toBeInTheDocument();
  });

  it("hides personal best section when longest streak is zero", () => {
    render(<StreakDisplay currentStreak={0} longestStreak={0} />);

    expect(screen.queryByText(/Personal Best/)).not.toBeInTheDocument();
  });

  it('shows "On Fire!" badge for streaks of 7 or more days', () => {
    render(<StreakDisplay currentStreak={7} longestStreak={14} />);

    expect(screen.getByText("🔥 On Fire!")).toBeInTheDocument();
  });

  it('shows encouragement badge for streaks under 7 days', () => {
    render(<StreakDisplay currentStreak={3} longestStreak={10} />);

    expect(screen.getByText("Keep it going!")).toBeInTheDocument();
  });
});
