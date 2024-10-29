from celery import shared_task
from decimal import Decimal, ROUND_HALF_UP
from transactions.serializer import HoldingsSerializer
from transactions.models import Holdings
from userinformation.models import PortfolioSnapshot
from authentication.models import CustomUser
from yfinanceapi import SearchTicker
from datetime import datetime

@shared_task
def snapshot_total_portfolio_value():
    print("creating")
    users = CustomUser.objects.all()
    today = datetime.now().date()  # get today's date

    for user in users:
        # if PortfolioSnapshot.objects.filter(user=user, date=today).exists():
        #     print(f"Snapshot already exists for {user} on {today}")
        #     continue  # Skip this user if an entry already exists for today

        try:
            searchTicker = SearchTicker()
            holdings = Holdings.objects.filter(user=user)
            holdings_serializer = HoldingsSerializer(holdings, many=True)
            holdings_data = holdings_serializer.data
            total_value = 0

            if holdings_data:
                for obj in holdings_data:
                    price = searchTicker.get_fund_ticker_price(obj["ticker"])
                    total_value += (Decimal(price) * Decimal(obj["num_of_shares"])).quantize(Decimal('0.01'), rounding=ROUND_HALF_UP)

                PortfolioSnapshot.objects.create(
                    user=user,
                    portfolio_value=total_value,
                )

            else:
                print("Something went wrong in snapshot_total_portfolio_value")
        except Exception as e:
            print(e)
