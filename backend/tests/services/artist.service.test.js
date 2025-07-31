import { describe, it, expect, beforeEach, vi } from "vitest";
import * as artistService from "../../services/artist.service.js";
import Artist from "../../models/artist.model.js";
import * as validation from "../../errors/ArtistValidationError.js";
import ArtistResponseDTO from "../../dto/artist/responses/ArtistResponseDTO.js";

describe("Artist Service - Unit Tests", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("should create a new artist", async () => {
    const dto = { name: "Test Artist" };
    const validated = { name: "Test Artist" };
    const fakeArtist = { artist_id: 1, name: "Test Artist" };

    vi.spyOn(validation, "validateArtistData").mockReturnValue(validated);
    vi.spyOn(Artist, "create").mockResolvedValue(fakeArtist);

    const result = await artistService.createArtist(dto);

    expect(result).toEqual(new ArtistResponseDTO(fakeArtist));
    expect(Artist.create).toHaveBeenCalledWith(validated);
  });

  it("should get all artists", async () => {
    const fakeArtists = [
      { artist_id: 1, name: "A" },
      { artist_id: 2, name: "B" },
    ];
    vi.spyOn(Artist, "findAll").mockResolvedValue(fakeArtists);

    const result = await artistService.getAllArtists();

    expect(result).toEqual(fakeArtists.map((a) => new ArtistResponseDTO(a)));
    expect(Artist.findAll).toHaveBeenCalled();
  });

  it("should update an artist", async () => {
    const id = 1;
    const dto = { name: "Updated" };
    const validated = { name: "Updated" };
    const updatedArtist = { artist_id: 1, name: "Updated" };

    vi.spyOn(validation, "validateArtistData").mockReturnValue(validated);
    vi.spyOn(Artist, "update").mockResolvedValue([1]);
    vi.spyOn(Artist, "findByPk").mockResolvedValue(updatedArtist);
    vi.spyOn(validation, "validateArtistExists").mockReturnValue();

    const result = await artistService.updateArtist(id, dto);

    expect(result).toEqual(new ArtistResponseDTO(updatedArtist));
    expect(Artist.update).toHaveBeenCalledWith(validated, {
      where: { artist_id: id },
    });
    expect(Artist.findByPk).toHaveBeenCalledWith(id);
  });

  it("should delete an artist", async () => {
    const id = 1;
    const fakeArtist = { artist_id: 1, name: "A" };

    vi.spyOn(Artist, "findByPk").mockResolvedValue(fakeArtist);
    vi.spyOn(validation, "validateArtistExists").mockReturnValue();
    vi.spyOn(Artist, "destroy").mockResolvedValue(1);

    const result = await artistService.deleteArtist(id);

    expect(result).toBe(1);
    expect(Artist.destroy).toHaveBeenCalledWith({ where: { artist_id: id } });
  });

  it("should get artist by id", async () => {
    const id = 1;
    const fakeArtist = { artist_id: 1, name: "A" };

    vi.spyOn(Artist, "findByPk").mockResolvedValue(fakeArtist);
    vi.spyOn(validation, "validateArtistExists").mockReturnValue();

    const result = await artistService.getArtistById(id);

    expect(result).toEqual(new ArtistResponseDTO(fakeArtist));
    expect(Artist.findByPk).toHaveBeenCalledWith(id);
  });
});
