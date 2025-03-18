import { render } from '@testing-library/react';
import GameLayout from './layout';

describe('GameLayout', () => {
  it('should render children within providers', () => {
    const { getByText } = render(
      <GameLayout>
        <div>Test Child</div>
      </GameLayout>,
    );

    expect(getByText('Test Child')).toBeInTheDocument();
  });
});
