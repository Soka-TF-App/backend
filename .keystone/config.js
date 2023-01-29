"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// keystone.ts
var keystone_exports = {};
__export(keystone_exports, {
  default: () => keystone_default
});
module.exports = __toCommonJS(keystone_exports);
var import_core2 = require("@keystone-6/core");

// schema.ts
var import_core = require("@keystone-6/core");
var import_access = require("@keystone-6/core/access");
var import_fields = require("@keystone-6/core/fields");
var autoIncrementInt = () => (0, import_fields.integer)({
  defaultValue: 0,
  validation: { isRequired: true },
  graphql: {
    create: {
      isNonNull: false
    }
  }
});
var dateType = () => (0, import_fields.calendarDay)({
  validation: { isRequired: true },
  graphql: {
    create: {
      isNonNull: true
    }
  }
});
var lists = {
  Kandang: (0, import_core.list)({
    access: import_access.allowAll,
    fields: {
      name: (0, import_fields.text)({ validation: { isRequired: true } }),
      periodes: (0, import_fields.relationship)({ ref: "Periode", many: true })
    }
  }),
  Periode: (0, import_core.list)({
    access: import_access.allowAll,
    fields: {
      number: autoIncrementInt(),
      startAt: dateType(),
      kandang: (0, import_fields.relationship)({ ref: "Kandang" })
    },
    hooks: {
      resolveInput: async ({ resolvedData, context }) => {
        const kandangId = resolvedData.kandang?.connect?.id;
        if (!kandangId) {
          return resolvedData;
        }
        try {
          const numberOfPeriode = await context.db.Periode.count({
            where: {
              kandang: {
                id: {
                  equals: kandangId
                }
              }
            }
          });
          return {
            ...resolvedData,
            number: numberOfPeriode + 1
          };
        } catch (err) {
          console.log(err);
        }
        return resolvedData;
      }
    }
  }),
  DataDOC: (0, import_core.list)({
    access: import_access.allowAll,
    fields: {
      periode: (0, import_fields.relationship)({ ref: "Periode" }),
      jumlahDOC: (0, import_fields.integer)({ validation: { isRequired: true } }),
      tipeDOC: (0, import_fields.text)({ validation: { isRequired: true } }),
      kematianDOC: (0, import_fields.integer)({ validation: { isRequired: true } }),
      bobotBox: (0, import_fields.integer)({ validation: { isRequired: true } }),
      kodeBox: (0, import_fields.text)({ validation: { isRequired: true } }),
      samples: (0, import_fields.relationship)({ ref: "SampleDOC", many: true })
    }
  }),
  SampleDOC: (0, import_core.list)({
    access: import_access.allowAll,
    fields: {
      bobot: (0, import_fields.integer)({ validation: { isRequired: true } })
    }
  }),
  DataWeekly: (0, import_core.list)({
    access: import_access.allowAll,
    fields: {
      periode: (0, import_fields.relationship)({ ref: "Periode" }),
      lantai: (0, import_fields.integer)({ validation: { isRequired: true } }),
      sekat: (0, import_fields.integer)({ validation: { isRequired: true } }),
      samples: (0, import_fields.relationship)({ ref: "SampleWeekly", many: true })
    }
  }),
  SampleWeekly: (0, import_core.list)({
    access: import_access.allowAll,
    fields: {
      periode: (0, import_fields.relationship)({ ref: "Periode" }),
      bobot: (0, import_fields.integer)({ validation: { isRequired: true } })
    }
  }),
  DataDaily: (0, import_core.list)({
    access: import_access.allowAll,
    fields: {
      periode: (0, import_fields.relationship)({ ref: "Periode" }),
      waktu: (0, import_fields.select)({
        type: "enum",
        options: [
          { label: "siang", value: "siang" },
          { label: "malam", value: "malam" }
        ],
        defaultValue: "siang",
        validation: { isRequired: true },
        ui: { displayMode: "select" }
      }),
      jumlahMati: (0, import_fields.integer)({ validation: { isRequired: true } }),
      jumlahAfkir: (0, import_fields.integer)({ validation: { isRequired: true } })
    }
  }),
  DataPanen: (0, import_core.list)({
    access: import_access.allowAll,
    fields: {
      periode: (0, import_fields.relationship)({ ref: "Periode" }),
      namaPelanggan: (0, import_fields.text)({ validation: { isRequired: true } }),
      noSPPA: (0, import_fields.text)({ validation: { isRequired: true } }),
      noTruck: (0, import_fields.text)({ validation: { isRequired: true } }),
      namaPengemudi: (0, import_fields.text)({ validation: { isRequired: true } }),
      jumlahAyam: (0, import_fields.integer)({ validation: { isRequired: true } }),
      bobot: (0, import_fields.integer)({ validation: { isRequired: true } })
    }
  }),
  DataPenjarangan: (0, import_core.list)({
    access: import_access.allowAll,
    fields: {
      periode: (0, import_fields.relationship)({ ref: "Periode" }),
      namaPelanggan: (0, import_fields.text)({ validation: { isRequired: true } }),
      noSPPA: (0, import_fields.text)({ validation: { isRequired: true } }),
      noTruck: (0, import_fields.text)({ validation: { isRequired: true } }),
      namaPengemudi: (0, import_fields.text)({ validation: { isRequired: true } }),
      jumlahAyam: (0, import_fields.integer)({ validation: { isRequired: true } }),
      bobot: (0, import_fields.integer)({ validation: { isRequired: true } })
    }
  }),
  DataSapronak: (0, import_core.list)({
    access: import_access.allowAll,
    fields: {
      periode: (0, import_fields.relationship)({ ref: "Periode" }),
      jumlahPakan: (0, import_fields.integer)({ validation: { isRequired: true } }),
      namaObat: (0, import_fields.text)({ validation: { isRequired: true } }),
      jumlahObat: (0, import_fields.integer)({ validation: { isRequired: true } }),
      satuan: (0, import_fields.text)({ validation: { isRequired: true } })
    }
  }),
  DataNonSapronak: (0, import_core.list)({
    access: import_access.allowAll,
    fields: {
      periode: (0, import_fields.relationship)({ ref: "Periode" }),
      jenis: (0, import_fields.text)({ validation: { isRequired: true } }),
      jumlah: (0, import_fields.integer)({ validation: { isRequired: true } }),
      satuan: (0, import_fields.text)({ validation: { isRequired: true } })
    }
  }),
  User: (0, import_core.list)({
    access: import_access.allowAll,
    fields: {
      name: (0, import_fields.text)({ validation: { isRequired: true } }),
      email: (0, import_fields.text)({
        validation: { isRequired: true },
        isIndexed: "unique"
      }),
      password: (0, import_fields.password)({ validation: { isRequired: true } }),
      createdAt: (0, import_fields.timestamp)({
        defaultValue: { kind: "now" }
      })
    }
  })
};

// auth.ts
var import_crypto = require("crypto");
var import_auth = require("@keystone-6/auth");
var import_session = require("@keystone-6/core/session");
var sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret && process.env.NODE_ENV !== "production") {
  sessionSecret = (0, import_crypto.randomBytes)(32).toString("hex");
}
var { withAuth } = (0, import_auth.createAuth)({
  listKey: "User",
  identityField: "email",
  sessionData: "name createdAt",
  secretField: "password",
  initFirstItem: {
    fields: ["name", "email", "password"]
  }
});
var sessionMaxAge = 60 * 60 * 24 * 30;
var session = (0, import_session.statelessSessions)({
  maxAge: sessionMaxAge,
  secret: sessionSecret
});

// keystone.ts
var keystone_default = withAuth(
  (0, import_core2.config)({
    db: {
      provider: "postgresql",
      url: "postgres://postgres:postgres@localhost:5432/soka",
      enableLogging: true,
      useMigrations: true,
      idField: { kind: "uuid" }
    },
    lists,
    session
  })
);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
