import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';

// see https://keystonejs.com/docs/fields/overview for the full list of fields
//   this is a few common fields for an example
import {
    text,
    relationship,
    password,
    timestamp,
    integer,
    calendarDay,
    select,
} from '@keystone-6/core/fields';

// when using Typescript, you can refine your types to a stricter subset by importing
// the generated types from '.keystone/types'
import type { Lists } from '.keystone/types';

const autoIncrementInt = () => integer({
    // NOTE: The default value does not matter, we input add it using hook
    defaultValue: 0,
    validation: { isRequired: true },
    graphql: {
        create: {
            isNonNull: false,
        }
    },
});

const dateType = () => calendarDay({
    validation: { isRequired: true },
    graphql: {
        create: {
            isNonNull: true,
        }
    },
});

export const lists: Lists = {
    Kandang: list({
        access: allowAll,
        fields: {
            name: text({ validation: { isRequired: true } }),
            periodes: relationship({ ref: "Periode", many: true })
        }
    }),

    Periode: list({
        access: allowAll,
        fields: {
            number: autoIncrementInt(),
            startAt: dateType(),
            kandang: relationship({ ref: 'Kandang' })
        },
        hooks: {
            resolveInput: async ({ resolvedData, context }) => {
                const kandangId = resolvedData.kandang?.connect?.id;
                // WARN: we dont care of this edge cases, if you do please fix it
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
                    })

                    return {
                        ...resolvedData,
                        number: numberOfPeriode + 1
                    }
                } catch (err: any) {
                    console.log(err)
                }


                return resolvedData;
            }
        }
    }),

    DataDOC: list({
        access: allowAll,
        fields: {
            periode: relationship({ ref: 'Periode' }),
            jumlahDOC: integer({ validation: { isRequired: true } }),
            tipeDOC: text({ validation: { isRequired: true } }),
            kematianDOC: integer({ validation: { isRequired: true } }),
            bobotBox: integer({ validation: { isRequired: true } }),
            kodeBox: text({ validation: { isRequired: true } }),
            samples: relationship({ ref: 'SampleDOC', many: true }),
        },
    }),


    SampleDOC: list({
        access: allowAll,
        fields: {
            bobot: integer({ validation: { isRequired: true } }),
        },
    }),

    DataWeekly: list({
        access: allowAll,
        fields: {
            periode: relationship({ ref: 'Periode' }),
            lantai: integer({ validation: { isRequired: true } }),
            sekat: integer({ validation: { isRequired: true } }),
            samples: relationship({ ref: 'SampleWeekly', many: true }),
        },
    }),

    SampleWeekly: list({
        access: allowAll,
        fields: {
            periode: relationship({ ref: 'Periode' }),
            bobot: integer({ validation: { isRequired: true } }),
        },
    }),

    DataDaily: list({
        access: allowAll,
        fields: {
            periode: relationship({ ref: 'Periode' }),
            waktu: select({
                type: 'enum',
                options: [
                    { label: 'siang', value: 'siang' },
                    { label: 'malam', value: 'malam' },
                ],
                defaultValue: 'siang',
                validation: { isRequired: true, },
                ui: { displayMode: 'select' },
            }),
            jumlahMati: integer({ validation: { isRequired: true } }),
            jumlahAfkir: integer({ validation: { isRequired: true } }),
        },
    }),

    DataPanen: list({
        access: allowAll,
        fields: {
            periode: relationship({ ref: 'Periode' }),
            namaPelanggan: text({ validation: { isRequired: true } }),
            noSPPA: text({ validation: { isRequired: true } }),
            noTruck: text({ validation: { isRequired: true } }),
            namaPengemudi: text({ validation: { isRequired: true } }),
            jumlahAyam: integer({ validation: { isRequired: true } }),
            bobot: integer({ validation: { isRequired: true } }),
        },
    }),

    DataPenjarangan: list({
        access: allowAll,
        fields: {
            periode: relationship({ ref: 'Periode' }),
            namaPelanggan: text({ validation: { isRequired: true } }),
            noSPPA: text({ validation: { isRequired: true } }),
            noTruck: text({ validation: { isRequired: true } }),
            namaPengemudi: text({ validation: { isRequired: true } }),
            jumlahAyam: integer({ validation: { isRequired: true } }),
            bobot: integer({ validation: { isRequired: true } }),
        },
    }),

    DataSapronak: list({
        access: allowAll,
        fields: {
            periode: relationship({ ref: 'Periode' }),
            jumlahPakan: integer({ validation: { isRequired: true } }),
            namaObat: text({ validation: { isRequired: true } }),
            jumlahObat: integer({ validation: { isRequired: true } }),
            satuan: text({ validation: { isRequired: true } }),
        },
    }),

    DataNonSapronak: list({
        access: allowAll,
        fields: {
            periode: relationship({ ref: 'Periode' }),
            jenis: text({ validation: { isRequired: true } }),
            jumlah: integer({ validation: { isRequired: true } }),
            satuan: text({ validation: { isRequired: true } }),
        },
    }),


    User: list({
        access: allowAll,

        fields: {
            name: text({ validation: { isRequired: true } }),

            email: text({
                validation: { isRequired: true },
                isIndexed: 'unique',
            }),

            password: password({ validation: { isRequired: true } }),

            createdAt: timestamp({
                defaultValue: { kind: 'now' },
            }),
        },
    }),

};
