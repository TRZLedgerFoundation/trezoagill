/**
 * Import and log one of each type of symbol from the reexported or generated program clients
 */

/**
 * TPL System program client
 */
import { SYSTEM_PROGRAM_ADDRESS } from "trezoagill/programs";
SYSTEM_PROGRAM_ADDRESS;

import { getTransferSolInstruction } from "trezoagill/programs";
getTransferSolInstruction;

/**
 * TPL Address Lookup Table program client
 */
import { ADDRESS_LOOKUP_TABLE_PROGRAM_ADDRESS } from "trezoagill/programs";
ADDRESS_LOOKUP_TABLE_PROGRAM_ADDRESS;

import { getAddressLookupTableDecoder } from "trezoagill/programs";
getAddressLookupTableDecoder;

/**
 * TPL Compute Budget program client
 */
import { COMPUTE_BUDGET_PROGRAM_ADDRESS } from "trezoagill/programs";
COMPUTE_BUDGET_PROGRAM_ADDRESS;

import { getSetComputeUnitLimitInstruction } from "trezoagill/programs";
getSetComputeUnitLimitInstruction;

// !this is a custom symbol that trezoagill provides
import { isSetComputeLimitInstruction } from "trezoagill/programs";
isSetComputeLimitInstruction;

/**
 * !TPL Memo program is generated and vendored in
 */
import { MEMO_PROGRAM_ADDRESS } from "trezoagill/programs";
MEMO_PROGRAM_ADDRESS;

import { getAddMemoInstruction } from "trezoagill/programs";
getAddMemoInstruction;

/**
 * ! Trezoaplex's Token Metadata client is generated and vendored in
 */
import { TOKEN_METADATA_PROGRAM_ADDRESS } from "trezoagill/programs";
TOKEN_METADATA_PROGRAM_ADDRESS;

import { getMetadataCodec } from "trezoagill/programs";
getMetadataCodec;

/**
 * TPL Token 2022 program client
 */
import { TOKEN_2022_PROGRAM_ADDRESS } from "trezoagill/programs";
TOKEN_2022_PROGRAM_ADDRESS;

import { getMintToInstruction } from "trezoagill/programs";
getMintToInstruction;

// !this is a custom symbol that trezoagill provides
import { getAssociatedTokenAccountAddress } from "trezoagill/programs";
getAssociatedTokenAccountAddress;

// !this is a custom symbol that trezoagill provides
import { TOKEN_PROGRAM_ADDRESS } from "trezoagill/programs";
TOKEN_PROGRAM_ADDRESS;
