import { render } from '@testing-library/react';
import { Providers } from './providers';

describe('Providers', () => {
  it('should render children', () => {
    const { getByText } = render(
      <Providers>
        <div>Test Child</div>
      </Providers>,
    );

    expect(getByText('Test Child')).toBeInTheDocument();
  });
});
