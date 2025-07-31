import { describe, it, expect, vi, beforeEach } from "vitest";
import museumService from "../../services/museum.service.js";
import Museum from "../../models/museum.model.js";
import * as validation from "../../errors/MuseumValidationError.js";

describe("museum.service (unit tests)", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("should create a museum", async () => {
    const data = { name: "MoMA", location: "NYC" };
    const validated = { ...data };
    const fakeMuseum = { id: 1, ...validated };

    vi.spyOn(validation, "validateMuseumData").mockReturnValue(validated);
    vi.spyOn(Museum, "create").mockResolvedValue(fakeMuseum);

    const result = await museumService.createMuseum(data);

    expect(result).toBe(fakeMuseum);
    expect(validation.validateMuseumData).toHaveBeenCalledWith(data);
    expect(Museum.create).toHaveBeenCalledWith(validated);
  });

  it("should get all museums", async () => {
    const fakeMuseums = [
      { id: 1, name: "MoMA", location: "NYC" },
      { id: 2, name: "Louvre", location: "Paris" },
    ];
    vi.spyOn(Museum, "findAll").mockResolvedValue(fakeMuseums);

    const result = await museumService.getAllMuseums();

    expect(result).toBe(fakeMuseums);
    expect(Museum.findAll).toHaveBeenCalled();
  });

  it("should get museum by id", async () => {
    const fakeMuseum = { id: 1, name: "MoMA", location: "NYC" };
    vi.spyOn(Museum, "findByPk").mockResolvedValue(fakeMuseum);
    vi.spyOn(validation, "validateMuseumExists").mockReturnValue(fakeMuseum);

    const result = await museumService.getMuseumById(1);

    expect(result).toBe(fakeMuseum);
    expect(Museum.findByPk).toHaveBeenCalledWith(1);
    expect(validation.validateMuseumExists).toHaveBeenCalledWith(fakeMuseum);
  });

  it("should throw if museum by id not found", async () => {
    vi.spyOn(Museum, "findByPk").mockResolvedValue(null);
    vi.spyOn(validation, "validateMuseumExists").mockImplementation(() => { throw new Error("Museum not found"); });

    await expect(museumService.getMuseumById(1)).rejects.toThrow("Museum not found");
  });

  it("should update a museum", async () => {
    const id = 1;
    const data = { name: "MoMA Updated", location: "NYC" };
    const validated = { ...data };
    const fakeMuseum = { id, name: "MoMA", location: "NYC", update: vi.fn() };

    vi.spyOn(Museum, "findByPk").mockResolvedValue(fakeMuseum);
    vi.spyOn(validation, "validateMuseumExists").mockReturnValue(fakeMuseum);
    vi.spyOn(validation, "validateMuseumData").mockReturnValue(validated);
    fakeMuseum.update.mockResolvedValue();

    const result = await museumService.updateMuseum(id, data);

    expect(fakeMuseum.update).toHaveBeenCalledWith(validated);
    expect(result).toBe(fakeMuseum);
  });

  it("should throw if update museum not found", async () => {
    vi.spyOn(Museum, "findByPk").mockResolvedValue(null);
    vi.spyOn(validation, "validateMuseumExists").mockImplementation(() => { throw new Error("Museum not found"); });

    await expect(museumService.updateMuseum(1, {})).rejects.toThrow("Museum not found");
  });

  it("should delete a museum", async () => {
    const id = 1;
    const fakeMuseum = { id, name: "MoMA", destroy: vi.fn() };

    vi.spyOn(Museum, "findByPk").mockResolvedValue(fakeMuseum);
    vi.spyOn(validation, "validateMuseumExists").mockReturnValue(fakeMuseum);
    fakeMuseum.destroy.mockResolvedValue();

    const result = await museumService.deleteMuseum(id);

    expect(fakeMuseum.destroy).toHaveBeenCalled();
    expect(result).toBe(true);
  });

  it("should throw if delete museum not found", async () => {
    vi.spyOn(Museum, "findByPk").mockResolvedValue(null);
    vi.spyOn(validation, "validateMuseumExists").mockImplementation(() => { throw new Error("Museum not found"); });

    await expect(museumService.deleteMuseum(1)).rejects.toThrow("Museum not found");
  });
});