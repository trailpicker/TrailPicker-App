"use client";

import * as gear from "@/app/build/actions";
import * as trip from "@/lib/trip-planner-actions";
import * as history from "@/lib/build-history-actions";
import { renameBuild as rename } from "@/lib/build-settings-actions";
import { setBuildVisibility as visibility } from "@/lib/build-visibility-actions";
import { trackBuildSave } from "@/lib/build-save-status";
const id = (form: FormData) => String(form.get("buildId") ?? "");
const item = (form: FormData) => String(form.get("itemId") ?? "");
export const updateQuantity = (form: FormData) => trackBuildSave(id(form), `quantity:${item(form)}`, () => gear.updateQuantity(form));
export const setItemCategory = (form: FormData) => trackBuildSave(id(form), `category:${item(form)}`, () => gear.setItemCategory(form));
export const addCustomItem = (form: FormData) => trackBuildSave(id(form), "custom-item", () => gear.addCustomItem(form));
export const addGear = (form: FormData) => trackBuildSave(id(form), "add-gear", () => gear.addGear(form));
export const removeGear = (form: FormData) => trackBuildSave(id(form), `remove:${item(form)}`, () => gear.removeGear(form));
export const duplicateBuild = (form: FormData) => trackBuildSave(id(form), "duplicate", () => gear.duplicateBuild(form));
export const importBuildItems = (form: FormData) => trackBuildSave(id(form), "import", () => gear.importBuildItems(form));
export const updateTripDetails = (form: FormData) => trackBuildSave(id(form), "trip-details", () => gear.updateTripDetails(form));
export const updateTripDay = (form: FormData) => trackBuildSave(id(form), `trip-day:${String(form.get("dayId") ?? "")}`, () => gear.updateTripDay(form));
export const updateTripDayNote = (form: FormData) => trackBuildSave(id(form), `trip-day-note:${String(form.get("dayId") ?? "")}`, () => trip.saveTripDayNote(form));
export const saveTripLogistics = (form: FormData) => trackBuildSave(id(form), "logistics", () => trip.saveTripLogistics(form));
export const saveTripRoute = (form: FormData) => trackBuildSave(id(form), "route", () => trip.saveTripRoute(form));
export const renameBuild = (buildId: string, name: string) => trackBuildSave(buildId, "rename", () => rename(buildId, name));
export const setBuildVisibility = (buildId: string, isPublic: boolean) => trackBuildSave(buildId, "visibility", () => visibility(buildId, isPublic));
export const restoreBuildRevision = (buildId: string, revisionId: string) => trackBuildSave(buildId, "restore", () => history.restoreBuildRevision(buildId, revisionId));
export const undoLastBuildChange = (buildId: string) => trackBuildSave(buildId, "undo", () => history.undoLastBuildChange(buildId));
// Reads do not change the save indicator.
export { getBuildExport } from "@/app/build/actions";
export { getBuildHistory } from "@/lib/build-history-actions";

export const updateTripDaySummary = (form: FormData) => trackBuildSave(id(form), `trip-day-summary:${String(form.get("dayId") ?? "")}`, () => trip.saveTripDaySummary(form));
