# 🟢 Patrimo — Your On-Chain Wealth Advisor

[▶️ Watch Demo](https://youtu.be/V0GsJ7MxPTY)

---

## 🚀 Why — What's the problem?

Crypto users often lack guidance. Financial advisors exist, but their suggestions don’t translate easily into self-custodied execution.

**Patrimo bridges that gap**, connecting users with trusted advisors who can suggest portfolio moves — while the user retains full custody.

---

## ⚙️ How — How does it work?

1. User signs up with **PortalHQ** — gets a wallet they control.
2. Browses available advisors and picks one.
3. Advisor proposes portfolio changes (e.g., "Buy ETH with MXNB").
4. User **accepts or rejects** each proposal — transactions are signed by the user only.

---

## 👥 Who — Who is it for?

- **Crypto users** who want guidance without giving up custody.
- **Financial advisors** offering smart crypto portfolio strategies.

---

## 🎯 Built For — Hackathon Tracks

| Track              | Integration Highlights                                                |
|-------------------|------------------------------------------------------------------------|
| ✅ Payments        | Uses **MXNB** (Mexican stablecoin) for transfers and purchases         |
| ✅ DeFi            | Users can accept proposals and execute swaps between assets            |
| ✅ General / Open  | Fully functional on-chain fintech with real UX and visual polish       |

---

## 🧩 Tech Stack

| Tech         | Purpose                                                                  |
|--------------|--------------------------------------------------------------------------|
| **PortalHQ** | User onboarding, wallet creation, transaction signing                    |
| **Next.js**  | Web app frontend                                                         |
| **Tailwind** | Responsive UI design                                                     |
| **Recharts** | Portfolio insights and data visualization                                |
| **Juno (WIP)** | Planned for backend transaction automation (commented in `AdvisorActions.tsx`) |
|       |

---

## 🔐 About MXNB & Arbitrum

- **MXNB**: Stablecoin used to simulate purchasing crypto assets.
- **Arbitrum**: L2 chain powering all on-chain transactions — low fees, fast finality.

---

## 📝 Key Code Notes

- 🔑 **Portal integration** → in `hooks/usePortalWallet.ts` and layout components.
- 🧠 **Juno pre-integration** → code commented in `components/advisor/AddMXNB.tsx` and `components/advisor/WithdrawMXNB.tsx`.


---

## 🫡 Built with ❤️ at the Bitso MXNB  Hackathon

by:
– [ Julio Flores ](https://x.com/Julioafs)
– [ Ángel Melendez ](https://x.com/troopdegen)
– [ Valentín Martínez ](https://x.com/ValeCreativo)
