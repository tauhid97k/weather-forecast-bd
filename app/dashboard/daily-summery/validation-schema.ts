import * as Yup from "yup"

export const weatherFormSchema = Yup.object({
  dataType: Yup.string()
    .max(2, "Maximum 2 characters")
    .matches(/^[0-9]*$/, "Must contain only numbers"),

  stationNo: Yup.string()
    .max(5, "Maximum 5 characters")
    .matches(/^[0-9]*$/, "Must contain only numbers"),

  year: Yup.string()
    .max(2, "Maximum 2 characters")
    .matches(/^[0-9]*$/, "Must contain only numbers"),

  month: Yup.string()
    .max(2, "Maximum 2 characters")
    .matches(/^[0-9]*$/, "Must contain only numbers")
    .test("valid-month", "Month must be between 01 and 12", (value) => {
      if (!value || value.length === 0) return true
      const month = Number.parseInt(value)
      return !isNaN(month) && month >= 1 && month <= 12
    }),

  day: Yup.string()
    .max(2, "Maximum 2 characters")
    .matches(/^[0-9]*$/, "Must contain only numbers")
    .test("valid-day", "Day must be between 01 and 31", (value) => {
      if (!value || value.length === 0) return true
      const day = Number.parseInt(value)
      return !isNaN(day) && day >= 1 && day <= 31
    }),

  measurements: Yup.array().of(
    Yup.string()
      .nullable()
      .matches(/^[0-9]*$/, "Must contain only numbers"),
  ),

  meteorCodes: Yup.array().of(Yup.string().nullable()),

  characterCodes: Yup.object(),

  windDirection: Yup.string().nullable(),

  windTime: Yup.string()
    .nullable()
    .matches(/^[0-9]*$/, "Must contain only numbers"),
})
