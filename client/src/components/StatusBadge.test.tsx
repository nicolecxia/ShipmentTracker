import { render, screen } from '@testing-library/react';
import StatusBadge, { statusColors } from './StatusBadge';
import { Chip } from '@mui/material';
import { ShipmentStatus } from '@/types/shipment';


// Mock the MUI Chip component to verify its props
jest.mock('@mui/material', () => ({
  Chip: jest.fn(({ label, color, size, variant }) => (
    <div data-testid="chip-mock" data-color={color} data-size={size} data-variant={variant}>
      {label}
    </div>
  )),
}));

describe('StatusBadge Component', () => {
  const testCases: ShipmentStatus[] = ['Pending', 'In Transit', 'Delivered', 'Cancelled'];

  it('renders without crashing', () => {
    render(<StatusBadge status="Pending" />);
    expect(screen.getByTestId('chip-mock')).toBeInTheDocument();
  });

  test.each(testCases)('applies correct color for %s status', (status) => {
    render(<StatusBadge status={status} />);
    const chip = screen.getByTestId('chip-mock');
    expect(chip).toHaveAttribute('data-color', statusColors[status]);
  });

  it('always renders with small size and outlined variant', () => {
    render(<StatusBadge status="Pending" />);
    const chip = screen.getByTestId('chip-mock');
    expect(chip).toHaveAttribute('data-size', 'small');
    expect(chip).toHaveAttribute('data-variant', 'outlined');
  });

  it('matches the statusColors mapping', () => {
    expect(statusColors).toEqual({
      'Pending': 'default',
      'In Transit': 'primary',
      'Delivered': 'success',
      'Cancelled': 'warning',
    });
  });
});