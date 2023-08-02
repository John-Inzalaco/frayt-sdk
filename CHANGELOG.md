# Change Log

All notable changes to the "frayt-sdk" project will be documented in this file.

## [1.0.70]

- Let requestResetPassword not require a user token
- Show preferred driver on match class

## [1.0.68]

- Update getPriority in Match class

## [1.0.67]

- Add Photo to match signature types

## [1.0.66]

- add `getPriority` and `getSLAEndTime` to match class. Add `{state: "pending_approval"}` to list of possible saveAccountUpdates parameters.

## [1.0.65]

- Replace `remaining` in getCompletedMatches response to `total_pages`

## [1.0.64]

- Add per_page to getCompletedMatches and expect both matches and remaining to be returned

## [1.0.63]

- Fix getCompletedMatches pagination

## [1.0.62]

- Add `isCanceled` function to Match class

## [1.0.61]

- Add missing `license_plate` field to Vehicle

## [1.0.60]

- Fix pickupMatch endpoint to just use base64 string of images

## [1.0.59]

- Add getCompletedMatches endpoint

## [1.0.58]

- Let destination photo be optional in params

## [1.0.57]

- Let destination photo be an optional string

## [1.0.56]

- Require driver location for all match actions

## [1.0.55]

- Fix updateUserDocument response

## [1.0.54]

- Add getLiveMatches endpoint

## [1.0.53]

- Add company name to shipper

## [1.0.52]

- Add registered state to list of parameters for updating user

## [1.0.51]

- Let update load/unload endpoint return full driver data

## [1.0.50]

- Use proper typing for updating cargo capacity

## [1.0.49]

- Fix typing of parameters in updateUserLoadUnload

## [1.0.48]

- explicitly set keys of createUserPaymentInfo parameters, write test, add isLive and isEnroute functions to match

## [1.0.47]

- Use correct RESTful action for all match endpoints

## [1.0.46]

- Let created_at and id be optional properties of DriverLocation

## [1.0.45]

- Add enroute to pickup/dropoff endpoints.

## [1.0.44]

- Add most of match endpoints

## [1.0.43]

- Add UserDeviceInfo and UserDeviceResult to exported types

## [1.0.42]

- Add updateOneSignalId endpoint.

## [1.0.41]

- Add missing date property in MatchPaymentsResult

## [1.0.40]

- Add missing types to export

## [1.0.39]

- Add missing endpoint

## [1.0.38]

- More experiments with exporting enums

## [1.0.37]

- Add getTotalPayments endpoints
- Change enum exports to enum exports

## [1.0.36]

- Fix typing for getMatchPayments result

## [1.0.35]

- Add getMatchPayments endpoint

## [1.0.34]

- Fix return of getAvailableMatches

## [1.0.33]

- Return results from getAvailableMatches

## [1.0.32]

- Return response and not axios request from getAvailableMatches

## [1.0.31]

- Don't instantiate match class in match endpoint

## [1.0.30]

- Add MatchStopType to exported types, let getDropoffs return stops without a type and stops defined as a dropoff

## [1.0.29]

- Let match endpoints instantiate Match class in responses

## [1.0.28]

- Add getDropoffs, getPickups, and getDestinationAddress to Match

## [1.0.27]

- Add Match Stop type property

## [1.0.26]

- Add match typings and two match endpoints

## [1.0.25]

- Add disabled state to user state

## [1.0.24]

- Fix typing of password confirmation for password endpoints

## [1.0.23]

- Fix various typings for Driver, add screening user state

## [1.0.22]

- Fix typing for saving vehicle photos

## [1.0.21]

- Let chargeBackgroundCheck return type Background Check Result

## [1.0.20]

- Add typing for updating profile information to saveAccountUpdates endpoint
- Let saveAccountUpdates return DriverData instead of Driver

## [1.0.18]

- Add typings to create/update vehicle endpoints

## [1.0.17]

- Add typings for valid saveAccountUpdates parameters

## [1.0.12]

- Add getProfileImage function to Driver class

## [1.0.11]

- Replace Driver interface with Class and add function to determine if documents are out of date

## [1.0.10]

- Return driver data from login endpoint

## [1.0.9]

- Add typings for Driver
- Add typings for some of the user actions
- Let user actions throw errors directly for the consumer to handle

## [1.0.8]

- Export all types in types folder

## [1.0.5]

- Add endpoint for retrieving driver/shipper agreement documents

## [0.0.1] - 2022-10-25

- Initial release
