import loguru
import sys

logger = loguru.logger


def setup_logger():
    logger.remove(0)
    logger.add(
        "logs/apis.log",
        format="{time} {level} {message} {extra}",
        level="INFO",
        serialize=True,
    )
    logger.add(
        sys.stderr,
        format="{time} {level} {message}",
        level="DEBUG",
    )
