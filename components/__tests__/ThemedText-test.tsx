import * as React from 'react';
import { expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react-native';

import { ThemedText } from '../ThemedText';

it('renders its content', async () => {
  await render(<ThemedText>Snapshot test!</ThemedText>);
  expect(screen.getByText('Snapshot test!')).toBeOnTheScreen();
});
