import { RepresentService } from '../representApi';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  // Mock postal code endpoint
  rest.get('https://represent.opennorth.ca/postcodes/:code', (req, res, ctx) => {
    return res(ctx.json({
      representatives_centroid: [
        {
          name: "John Doe",
          elected_office: "MP",
          district_name: "Test District",
          party_name: "Liberal"
        }
      ],
      boundaries_centroid: ["test-boundary"]
    }));
  }),

  // Mock location endpoint
  rest.get('https://represent.opennorth.ca/representatives/', (req, res, ctx) => {
    return res(ctx.json({
      objects: [
        {
          name: "Jane Smith",
          elected_office: "MLA",
          district_name: "Test Provincial District",
          party_name: "Conservative"
        }
      ]
    }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('RepresentService', () => {
  test('getByPostalCode returns formatted data', async () => {
    const result = await RepresentService.getByPostalCode('A1A1A1');
    
    expect(result).toHaveProperty('representatives');
    expect(result).toHaveProperty('boundaries');
    expect(result.representatives[0].name).toBe('John Doe');
  });

  test('getByLocation returns formatted data', async () => {
    const result = await RepresentService.getByLocation(45.4215, -75.6972);
    
    expect(result).toHaveProperty('representatives');
    expect(result.representatives[0].name).toBe('Jane Smith');
  });

  test('handles API errors gracefully', async () => {
    server.use(
      rest.get('https://represent.opennorth.ca/postcodes/:code', (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    await expect(RepresentService.getByPostalCode('A1A1A1'))
      .rejects
      .toThrow('Unable to find representatives for this postal code');
  });
}); 