/**
 * Versioned contract definitions for Catalog service.
 */

const CatalogContractsV1 = {
  version: "v1",
  moviesEventsResponse: {
    type: "object",
    required: ["items"],
    properties: {
      items: {
        type: "array",
        items: {
          type: "object",
          required: ["id", "title", "language", "durationMinutes", "rating"],
          properties: {
            id: { type: "string" },
            title: { type: "string" },
            language: { type: "string" },
            durationMinutes: { type: "number" },
            rating: { type: "string" },
            genres: { type: "array", items: { type: "string" } }
          }
        }
      }
    }
  },
  venuesTheatersResponse: {
    type: "object",
    required: ["items"],
    properties: {
      items: {
        type: "array",
        items: {
          type: "object",
          required: ["id", "name", "city", "screens"],
          properties: {
            id: { type: "string" },
            name: { type: "string" },
            city: { type: "string" },
            screens: { type: "number" }
          }
        }
      }
    }
  },
  schedulesShowtimesResponse: {
    type: "object",
    required: ["items"],
    properties: {
      items: {
        type: "array",
        items: {
          type: "object",
          required: ["id", "movieId", "venueId", "screen", "startTime", "availableSeats"],
          properties: {
            id: { type: "string" },
            movieId: { type: "string" },
            venueId: { type: "string" },
            screen: { type: "string" },
            startTime: { type: "string", format: "date-time" },
            availableSeats: { type: "number" }
          }
        }
      }
    }
  }
};

module.exports = { CatalogContractsV1 };
