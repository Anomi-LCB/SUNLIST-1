
import pandas as pd

file_path = r'c:\Users\user\Desktop\AG\명부검색 - 복사본 (2)\2026.2.1 선거인명부(3,887명)_최종.xlsx'

try:
    df = pd.read_excel(file_path)
    print("--- COLUMNS ---")
    for col in df.columns:
        print(f"'{col}'")
    print("\n--- FIRST ROW ---")
    print(df.iloc[0].to_dict())
except Exception as e:
    print(f"Error: {e}")
