import test from 'node:test';
import assert from 'node:assert/strict';
import { printableTripHtml, exportLogisticsCsv, exportCampsitesCsv, exportPackCsv } from '../lib/trip-resources-export.ts';

const payload = {
  name: 'Alpine <test>', people: 2,
  days: [{ id: 'd1', date: new Date('2026-11-11T12:00:00Z'), startLocation: 'Trailhead', endLocation: 'Camp', notes: 'Day notes', distanceKm: 7 }],
  points: [{ id:'w1', name:'=Cold stream', kind:'water', lat:49,lng:-123,dayId:'d1', resource:{detail:'Seasonal <water>',waterReliability:'seasonal'} }],
  logistics: { permits:'PERMIT-SECRET', reservations:'RES-SECRET', transportation:'Shuttle', parking:'Main lot', emergencyContact:'PRIVATE PHONE', emergencyPlan:'PRIVATE PLAN', notes:'Public note' },
  bookings: [{ id:'b1', waypointId:'', dayId:'d1', campground:'Alpine Camp', status:'confirmed', arrival:'', departure:'', provider:'BC Parks', confirmation:'SECRET123', notes:'PRIVATE BOOKING NOTE' }],
  packLines: [{ id:'i1', name:'Tent', category:'Shelter', quantity:1, gramsEach:850, grams:850, weightClass:'base' }],
};

test('selecting only itinerary hides resources, logistics, and packing', () => {
  const html = printableTripHtml(payload, false, { itinerary:true, resources:false, logistics:false, packing:false });
  assert.match(html, /Day 1/);
  assert.match(html, /Day notes/);
  assert.doesNotMatch(html, /Seasonal &lt;water&gt;|Alpine Camp|Shuttle|Tent/);
});

test('selecting only resources lists water, campsite reservations and excludes private codes by default', () => {
  const html = printableTripHtml(payload, false, { itinerary:false, resources:true, logistics:false, packing:false });
  assert.match(html, /Campsites &amp; water sources/);
  assert.match(html, /Seasonal &lt;water&gt;/);
  assert.match(html, /Alpine Camp/);
  assert.doesNotMatch(html, /SECRET123|PRIVATE BOOKING/);
  assert.match(printableTripHtml(payload,true,{itinerary:false,resources:true,logistics:false,packing:false}),/SECRET123/);
});

test('documents keep private fields opt-in, escape HTML and accept sections independently', () => {
  const html = printableTripHtml(payload);
  assert.match(html, /Alpine &lt;test&gt;/);
  assert.match(html, /Shuttle/);
  assert.match(html, /Tent/);
  assert.doesNotMatch(html, /PERMIT-SECRET|RES-SECRET|SECRET123|PRIVATE PHONE|PRIVATE PLAN/);
  const onlyLogistics = printableTripHtml(payload,true,{itinerary:false,resources:false,logistics:true,packing:false});
  assert.match(onlyLogistics, /PERMIT-SECRET|RES-SECRET/);
  assert.doesNotMatch(onlyLogistics, /Campsites|Packing checklist|Day 1/);
});

test('CSV export actions retain the original private defaults', () => {
  assert.doesNotMatch(exportLogisticsCsv(payload,false),/PRIVATE PHONE|PERMIT-SECRET|SECRET123/);
  assert.match(exportLogisticsCsv(payload,true),/SECRET123/);
  assert.doesNotMatch(exportCampsitesCsv(payload,false),/SECRET123/);
  assert.match(exportPackCsv(payload),/Tent/);
});
