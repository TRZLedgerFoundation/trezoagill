/**
 * Import and log one of each type of symbol from the reexported or generated program clients
 */

/**
 * TPL System program client
 */
import { SYSTEM_PROGRAM_ADDRESS } from "trezoagill/programs";
SYSTEM_PROGRAM_ADDRESS;

import type { ParsedSystemInstruction } from "trezoagill/programs";
null as unknown as ParsedSystemInstruction;

import { getTransferSolInstruction } from "trezoagill/programs";
getTransferSolInstruction;

/**
 * TPL Address Lookup Table program client
 */
import { ADDRESS_LOOKUP_TABLE_PROGRAM_ADDRESS } from "trezoagill/programs";
ADDRESS_LOOKUP_TABLE_PROGRAM_ADDRESS;

import type { ParsedAddressLookupTableInstruction } from "trezoagill/programs";
null as unknown as ParsedAddressLookupTableInstruction;

import { getAddressLookupTableDecoder } from "trezoagill/programs";
getAddressLookupTableDecoder;

/**
 * TPL Compute Budget program client
 */
import { COMPUTE_BUDGET_PROGRAM_ADDRESS } from "trezoagill/programs";
COMPUTE_BUDGET_PROGRAM_ADDRESS;

import type { ParsedComputeBudgetInstruction } from "trezoagill/programs";
null as unknown as ParsedComputeBudgetInstruction;

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

// see Token Metadata's `MAINTAINERS.md` file about this type being renamed from `MintArgs` to `MetadataMintArgs`
import type { MetadataMintArgs } from "trezoagill/programs";
null as unknown as MetadataMintArgs;

import { getAddMemoInstruction } from "trezoagill/programs";
getAddMemoInstruction;

/**
 * ! Metaplex's Token Metadata client is generated and vendored in
 */
import { TOKEN_METADATA_PROGRAM_ADDRESS } from "trezoagill/programs";
TOKEN_METADATA_PROGRAM_ADDRESS;

import type { ParsedMemoInstruction } from "trezoagill/programs";
null as unknown as ParsedMemoInstruction;

import { getMetadataCodec } from "trezoagill/programs";
getMetadataCodec;

/**
 * TPL Token 2022 program client
 */
import { TOKEN_2022_PROGRAM_ADDRESS as TOKEN_2022_PROGRAM_ADDRESS_token } from "trezoagill/programs";
TOKEN_2022_PROGRAM_ADDRESS_token;

import { getMintToInstruction as getMintToInstruction_token } from "trezoagill/programs";
getMintToInstruction_token;

import type { ParsedToken2022Instruction as ParsedToken2022Instruction_token } from "trezoagill/programs";
null as unknown as ParsedToken2022Instruction_token;

// !this is a custom symbol that trezoagill provides
import { getAssociatedTokenAccountAddress as getAssociatedTokenAccountAddress_token } from "trezoagill/programs";
getAssociatedTokenAccountAddress_token;

// !this is a custom symbol that trezoagill provides
import { TOKEN_PROGRAM_ADDRESS as TOKEN_PROGRAM_ADDRESS_token } from "trezoagill/programs";
TOKEN_PROGRAM_ADDRESS_token;

/**
 * TPL Token 2022 program client
 */
import { TOKEN_2022_PROGRAM_ADDRESS } from "trezoagill/programs";
TOKEN_2022_PROGRAM_ADDRESS;

import { getMintToInstruction } from "trezoagill/programs";
getMintToInstruction;

import type { ParsedToken2022Instruction } from "trezoagill/programs";
null as unknown as ParsedToken2022Instruction;

// !this is a custom symbol that trezoagill provides
import { getAssociatedTokenAccountAddress } from "trezoagill/programs";
getAssociatedTokenAccountAddress;

// !this is a custom symbol that trezoagill provides
import { TOKEN_PROGRAM_ADDRESS } from "trezoagill/programs";
TOKEN_PROGRAM_ADDRESS;
