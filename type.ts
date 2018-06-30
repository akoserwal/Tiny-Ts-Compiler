namespace ts {
    
    export interface TextRange {
        pos: number;
        end: number;
    }

    export const enum SyntaxKind {
        NumericLiteral,
        StringLiteral,
        EndOfFileToken,
        SemicolonToken,
     //Assignment  
        EqualsToken,
     // Reserved words
        ConstKeyword,
        VarKeyword,
        VariableDeclaration,
        VariableDeclarationList,
        VariableStatement 
    }


    export const enum NodeFlags {

        Let                = 1 << 0,  // Variable declaration
        Const              = 1 << 1,  // Variable declaration
    }

    export const enum TransformFlags {
        None = 0,
    }

    export interface NodeArray<T extends Node> extends ReadonlyArray<T>, TextRange {
        hasTrailingComma?: boolean;
        /* @internal */ transformFlags: TransformFlags;   // Flags for transforms, possibly undefined
    }

    export interface Token<TKind extends SyntaxKind> extends Node {
        kind: TKind;
    }



    export interface Node extends TextRange {
        kind: SyntaxKind;
        flags: NodeFlags;
        /* @internal */ modifierFlagsCache?: ModifierFlags;
        /* @internal */ transformFlags: TransformFlags;       // Flags for transforms, possibly undefined
        decorators?: NodeArray<Decorator>;                    // Array of decorators (in document order)
        modifiers?: ModifiersArray;                           // Array of modifiers
        /* @internal */ id?: number;                          // Unique id (used to look up NodeLinks)
        parent: Node;                                         // Parent node (initialized by binding)
        /* @internal */ original?: Node;                      // The original node if this is an updated node.
        /* @internal */ symbol: Symbol;                       // Symbol declared by node (initialized by binding)
        /* @internal */ nextContainer?: Node;                 // Next container in declaration order (initialized by binding)
        /* @internal */ localSymbol?: Symbol;                 // Local symbol declared by node (initialized by binding only for exported nodes)
        /* @internal */ flowNode?: FlowNode;                  // Associated FlowNode (initialized by binding)
        /* @internal */ emitNode?: EmitNode;                  // Associated EmitNode (initialized by transforms)
        /* @internal */ contextualType?: Type;                // Used to temporarily assign a contextual type during overload resolution
        /* @internal */ contextualMapper?: TypeMapper;        // Mapper for contextual type
    }


    export const enum TokenFlags {
        None = 0,
        PrecedingLineBreak = 1 << 0,
        PrecedingJSDocComment = 1 << 1,
        Unterminated = 1 << 2,
        ExtendedUnicodeEscape = 1 << 3,
        Scientific = 1 << 4,        // e.g. `10e2`
        Octal = 1 << 5,             // e.g. `0777`
        HexSpecifier = 1 << 6,      // e.g. `0x00000000`
        BinarySpecifier = 1 << 7,   // e.g. `0b0110010000000000`
        OctalSpecifier = 1 << 8,    // e.g. `0o777`
        ContainsSeparator = 1 << 9, // e.g. `0b1100_0101`
        BinaryOrOctalSpecifier = BinarySpecifier | OctalSpecifier,
        NumericLiteralFlags = Scientific | Octal | HexSpecifier | BinarySpecifier | OctalSpecifier | ContainsSeparator
    }

    export interface Expression extends Node {
        _expressionBrand: any;
    }

   
    export interface UnaryExpression extends Expression {
        _unaryExpressionBrand: any;
    }

    /** Deprecated, please use UpdateExpression */
    export type IncrementExpression = UpdateExpression;
    export interface UpdateExpression extends UnaryExpression {
        _updateExpressionBrand: any;
    }


    export interface LeftHandSideExpression extends UpdateExpression {
        _leftHandSideExpressionBrand: any;
    }

    export interface MemberExpression extends LeftHandSideExpression {
        _memberExpressionBrand: any;
    }

    export interface PrimaryExpression extends MemberExpression {
        _primaryExpressionBrand: any;
    }


    // The text property of a LiteralExpression stores the interpreted value of the literal in text form. For a StringLiteral,
    // or any literal of a template, this means quotes have been removed and escapes have been converted to actual characters.
    // For a NumericLiteral, the stored value is the toString() representation of the number. For example 1, 1.00, and 1e0 are all stored as just "1".
    export interface LiteralLikeNode extends Node {
        text: string;
        isUnterminated?: boolean;
        hasExtendedUnicodeEscape?: boolean;
    }

    // The text property of a LiteralExpression stores the interpreted value of the literal in text form. For a StringLiteral,
    // or any literal of a template, this means quotes have been removed and escapes have been converted to actual characters.
    // For a NumericLiteral, the stored value is the toString() representation of the number. For example 1, 1.00, and 1e0 are all stored as just "1".
    export interface LiteralExpression extends LiteralLikeNode, PrimaryExpression {
        _literalExpressionBrand: any;
    }

    export interface NumericLiteral extends LiteralExpression {
        kind: SyntaxKind.NumericLiteral;
        /* @internal */
        numericLiteralFlags: TokenFlags;
    }

    export type DeclarationName =  NumericLiteral;

    export interface Declaration extends Node {
        _declarationBrand: any;
    }

    export interface NamedDeclaration extends Declaration {
        name?: DeclarationName;
    }

    export interface VariableDeclaration extends NamedDeclaration {
        kind: SyntaxKind.VariableDeclaration;
        parent: VariableDeclarationList | CatchClause;
        name: BindingName;                    // Declared variable name
        exclamationToken?: ExclamationToken;  // Optional definite assignment assertion
        type?: TypeNode;                      // Optional type annotation
        initializer?: Expression;             // Optional initializer
    }


    export interface Statement extends Node {
        _statementBrand: any;
    }

    export interface VariableStatement extends Statement {
        kind: SyntaxKind.VariableStatement;
        declarationList: VariableDeclarationList;
    }


    export interface VariableDeclarationList extends Node {
        kind: SyntaxKind.VariableDeclarationList;
        parent: VariableStatement;
        declarations: NodeArray<VariableDeclaration>;
    }

}