import { render } from '@testing-library/react';
import Page from './page';

describe('HomePage', () => {
  it('should render the title and navigation buttons', () => {
    const { getByText, getByRole } = render(<Page />);

    // Check title
    expect(getByText('Bowling Score Tracker')).toBeInTheDocument();

    // Check New Game button/link
    const newGameLink = getByRole('link', { name: /new game/i });
    expect(newGameLink).toBeInTheDocument();
    expect(newGameLink).toHaveAttribute('href', '/game/new');

    // Check View Scores button/link
    const viewScoresLink = getByRole('link', { name: /view scores/i });
    expect(viewScoresLink).toBeInTheDocument();
    expect(viewScoresLink).toHaveAttribute('href', '/game/history');
  });
});
